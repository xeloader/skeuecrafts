import useInterval from '../../../hooks/useInterval'
import { IconStates } from '../../../components/ep133-ui/DisplayMatrix'
import EP133, { BrickId, ButtonId, Icon, IndicatorId, IndicatorStates, ButtonStates } from '../../../components/ep133-ui/EP133'
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import USBCable from '../../../components/te/USBCable'
import { HeadFC } from 'gatsby'
import useSound from 'use-sound'
import { normalize } from '../../../utils/numbers'
interface Sound {
  id: number
  type: 'stereo' | 'mono'
}
interface SoundBank {
  [key: number]: Sound
}

type DisplayType = string |
((frame: number, { state }: { state: EP133State }) => string)

interface EP133State {
  gridMode: 'quantised' | 'tics'
  view: View
  shift: boolean
  userInput: boolean
  mute: boolean
  faderLevel: number
  bpm: number
  poweredOn: boolean
  project: number
  projectSounds: { [key: number]: SoundBank }
  displayValue: DisplayType
  displayDots: DisplayType
  buttonHistory: ButtonId[]
  inputBuffer: string
  expectingInput: boolean
  usbConnected: boolean
  indicators: IndicatorStates
  buttons: ButtonStates
  currentBank: 0 | 1 | 2 | 3
  displayAnimation: string
}

enum View {
  BPM,
  Sound,
  SoundEdit,
  EditSound,
  Edit,
  Main,
  Time,
  FX,
  Tempo,
  Trim,
  Envelope,
  MIDI,
  Group,
  Erase
}

enum Parameter {
  Pan,
  PlayMode,
  StartingPoint,
  EndPoint,
  TimeStretchMode
}

enum Value {
  OneShot,
  Key,
  Legato
}

const parameters = [
  { id: Parameter.Pan, title: 'PAN', values: [-100, 100] },
  { id: Parameter.PlayMode, options: [{ title: 'ONE' }, { title: 'KEY' }, { title: 'LEG' }] },
  { id: Parameter.TimeStretchMode, options: [{ title: 'BPM' }, { title: 'BAR' }] }
]

// navigate sets one of the following views as current.
// push old views to queue, fifo
// set variable for subview to indicate which child to set / display?
const Views = [
  { id: View.Sound },
  {
    id: View.SoundEdit,
    title: 'SND',
    icons: { [Icon.Sound]: { glow: 1 } },
    children: [
      View.EditSound,
      View.Trim,
      View.Envelope,
      View.Time,
      View.MIDI,
      View.Group
    ]
  },
  {
    id: View.Main,
    icons: { [Icon.Main]: { glow: 1 } }
  },
  {
    id: View.EditSound,
    title: 'SND',
    icons: { [Icon.Note]: { glow: 0.5 } },
    parameters: [
      Parameter.PlayMode
    ]
  },
  { id: View.Trim, title: 'TRI', icons: { [Icon.Trim]: { glow: 1 } } },
  { id: View.Envelope, title: 'ENV', icons: { [Icon.Envelope]: { glow: 1 } } },
  { id: View.Time, title: 'TIM', icons: { [Icon.Rabbit]: { glow: 1 } } },
  { id: View.MIDI, title: 'MID', icons: { [Icon.MIDI]: { glow: 1 } } },
  { id: View.Group, title: 'GRP', icons: { [Icon.Mute]: { glow: 1 } } },
  { id: View.Erase, icons: { [Icon.Erase]: { glow: 1 } } }
]

enum EP133ActionKind {
  BPM,
  SET_VIEW,
  ADD_BUTTON,
  SET_STATE,
  POWER,
  SET_INDICATOR
}

interface EP133Action {
  type: EP133ActionKind
}

interface BPMAction extends EP133Action {
  type: EP133ActionKind.BPM
  bpm: number
}

interface SetViewAction extends EP133Action {
  type: EP133ActionKind.SET_VIEW
  view: View
}

interface AddButtonAction extends EP133Action {
  type: EP133ActionKind.ADD_BUTTON
  button: ButtonId
}

interface ManagePowerAction extends EP133Action {
  type: EP133ActionKind.POWER
  state: boolean
}

interface SetIndicatorAction extends EP133Action {
  type: EP133ActionKind.SET_INDICATOR
  indicator: IndicatorId
  state: boolean
}

interface SetStateAction extends EP133Action {
  type: EP133ActionKind.SET_STATE
  state: Partial<EP133State>
}

const initState: EP133State = {
  view: View.Main,
  indicators: { [IndicatorId.ABank]: { state: true } },
  buttons: {},
  gridMode: 'quantised',
  displayValue: ' Lo',
  buttonHistory: [],
  displayDots: '..',
  usbConnected: false,
  currentBank: 0,
  project: 1,
  shift: false,
  userInput: false,
  mute: false,
  faderLevel: 50,
  bpm: 120,
  poweredOn: true,
  projectSounds: {},
  inputBuffer: '',
  expectingInput: false,
  displayAnimation: 'startup'
}

const reducer = (state: EP133State, action: EP133Action): EP133State => {
  let _action
  switch (action.type) {
    case EP133ActionKind.BPM:
      return {
        ...state,
        bpm: (action as BPMAction).bpm
      }
    case EP133ActionKind.SET_VIEW:
      return {
        ...state,
        view: (action as SetViewAction).view
      }
    case EP133ActionKind.ADD_BUTTON:
      return {
        ...state,
        buttonHistory: [
          ...state.buttonHistory.slice(-5),
          (action as AddButtonAction).button
        ]
      }
    case EP133ActionKind.SET_STATE:
      return {
        ...state,
        ...(action as SetStateAction).state
      }
    case EP133ActionKind.SET_INDICATOR:
      _action = action as SetIndicatorAction
      return {
        ...state,
        indicators: {
          ...state.indicators,
          [_action.indicator]: { state: _action.state }
        }
      }
    case EP133ActionKind.POWER:
      _action = action as ManagePowerAction
      if (_action.state) {
        return {
          ...initState,
          usbConnected: state.usbConnected
        }
      } else {
        return {
          ...state,
          poweredOn: _action.state,
          displayValue: '',
          displayDots: '',
          indicators: {}
        }
      }
    default:
      return state
  }
}

const soundPads = [ButtonId.Digit0, ButtonId.Digit1, ButtonId.Digit2, ButtonId.Digit3, ButtonId.Digit4, ButtonId.Digit5, ButtonId.Digit6, ButtonId.Digit7, ButtonId.Digit8, ButtonId.Digit9, ButtonId.Dot, ButtonId.Enter]
const numberPads = [ButtonId.Digit0, ButtonId.Digit1, ButtonId.Digit2, ButtonId.Digit3, ButtonId.Digit4, ButtonId.Digit5, ButtonId.Digit6, ButtonId.Digit7, ButtonId.Digit8, ButtonId.Digit9]
const bankButtons = [ButtonId.ABank, ButtonId.BBank, ButtonId.CBank, ButtonId.DBank]
const bankToIndicator: { [key in ButtonId]?: IndicatorId } = {
  [ButtonId.ABank]: IndicatorId.ABank,
  [ButtonId.BBank]: IndicatorId.BBank,
  [ButtonId.CBank]: IndicatorId.CBank,
  [ButtonId.DBank]: IndicatorId.DBank
}

function continuosValuesFor (value: number, count: number, actualMax: number, max: number = 1): number[] {
  const arr = Array.from(Array(count))
  let rest = value
  return arr.map(() => {
    if (rest > actualMax) {
      rest -= actualMax
      return normalize(actualMax, 0, 25, 0, 1)
    } else {
      const prev = rest
      rest = 0
      return normalize(prev, 0, 25, 0, 1)
    }
  })
}

function isSoundPad (button: ButtonId): boolean {
  return soundPads.includes(button)
}
function isInputButton (button: ButtonId, includeDot: boolean = false): boolean {
  return numberPads.includes(button) ||
    (includeDot && button === ButtonId.Dot)
}

function valueOfButton (button: ButtonId): string {
  switch (button) {
    case ButtonId.Digit0: return '0'
    case ButtonId.Digit1: return '1'
    case ButtonId.Digit2: return '2'
    case ButtonId.Digit3: return '3'
    case ButtonId.Digit4: return '4'
    case ButtonId.Digit5: return '5'
    case ButtonId.Digit6: return '6'
    case ButtonId.Digit7: return '7'
    case ButtonId.Digit8: return '8'
    case ButtonId.Digit9: return '9'
    case ButtonId.Dot: return '.'
    default: return '_'
  }
}

function isBankButton (button: ButtonId): boolean {
  return bankButtons.includes(button)
}

function indicatorForButton (button: ButtonId): IndicatorId {
  if (bankToIndicator[button] != null) {
    return bankToIndicator[button] as IndicatorId
  }
  throw Error('NO BANK MAPPED')
}

const bankToIcon: { [key: number]: Icon } = {
  0: Icon.AButton,
  1: Icon.BButton,
  2: Icon.CButton,
  3: Icon.DButton
}

const buttonToBank: { [key: number]: number } = {
  [ButtonId.ABank]: 0,
  [ButtonId.BBank]: 1,
  [ButtonId.CBank]: 2,
  [ButtonId.DBank]: 3
}

export default function EP133Page (): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initState)

  const [bpm, setBpm] = useState(120)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [displayValue, setDisplayValue] = useState('')

  const [volume, setVolume] = useState(100)

  const [soundAmp, setSoundAmp] = useState(50)
  const [soundPitch, setSoundPitch] = useState(50)

  const [deviceScale, setDeviceScale] = useState(1)
  const scaleByHeight = true

  const [play, { sound }] = useSound('/sounds/1.mp3', {
    volume: volume / 100
  })

  const intervalMs = 1000 / (bpm / 60)

  useInterval(() => {
    play()
  },
  isPlaying
    ? intervalMs
    : null
  )

  useEffect(() => {
    if (state.poweredOn) {
      dispatch({
        type: EP133ActionKind.SET_STATE,
        state: { displayAnimation: 'startup' }
      })
      const stopAnimation = () => {
        dispatch({
          type: EP133ActionKind.SET_STATE,
          state: { displayAnimation: null }
        })
      }
      const timer = setTimeout(() => {
        stopAnimation()
      }, 650)
      return () => {
        clearTimeout(timer)
        stopAnimation()
      }
    }
  }, [state.poweredOn])
  const icons = useMemo<IconStates>(() => {
    const display: IconStates = {}
    if (!state.poweredOn) return display
    if (state.view === View.Main) {
      display[Icon.Tic] = { glow: state.gridMode === 'tics' ? 1 : 0 }
      display[Icon.Bar] = { glow: state.gridMode === 'quantised' ? 1 : 0 }
      display[Icon.Main] = { glow: 1 }

      const [tl, bl, br, tr] = continuosValuesFor(soundAmp, 4, 25, 1)
      display[Icon.CircleTR] = { glow: tr }
      display[Icon.CircleBR] = { glow: br }
      display[Icon.CircleBL] = { glow: bl }
      display[Icon.CircleTL] = { glow: tl }

      const [gtl, gbl, gbr, gtr] = continuosValuesFor(soundPitch, 4, 25, 1)
      display[Icon.GridCircleTR] = { glow: gtr }
      display[Icon.GridCircleBR] = { glow: gbr }
      display[Icon.GridCircleBL] = { glow: gbl }
      display[Icon.GridCircleTL] = { glow: gtl }
    } else if (state.view === View.Sound) {
      display[Icon.Sound] = { glow: 1 }
    } else if (state.view === View.Tempo) {
      display[Icon.Tempo] = { glow: 1 }
    }
    display[Icon.Battery] = { glow: state.usbConnected ? 0 : 1 }
    for (let i = 0; i < 4; i++) {
      display[bankToIcon[i]] = { glow: state.currentBank === i ? 1 : 0 }
    }
    if (state.userInput) {
      display[Icon.Finger] = { glow: 1 }
    }
    return display
  }, [state, soundAmp, soundPitch])
  const handleButtonClick = useCallback((button: ButtonId) => {
    if (!state.poweredOn) return
    if (state.userInput && isInputButton(button)) {
      const value = valueOfButton(button)
      const action: SetStateAction = {
        type: EP133ActionKind.SET_STATE,
        state: {
          inputBuffer: (state.inputBuffer + value).slice(-3)
        }
      }
      dispatch(action)
    } else {
      if (button !== state.buttonHistory.at(-1)) {
        const action: SetStateAction = {
          type: EP133ActionKind.SET_STATE,
          state: { userInput: false }
        }
        dispatch(action)
      }
    }
    if (isBankButton(button)) {
      dispatch({ // eslint-disable-line
        type: EP133ActionKind.SET_STATE,
        state: {
          currentBank: buttonToBank[button]
        }
      } as SetStateAction)
      for (let i = 0; i < bankButtons.length; i++) {
        const bankButton = bankButtons[i]
        dispatch({ // eslint-disable-line
          type: EP133ActionKind.SET_INDICATOR,
          indicator: indicatorForButton(bankButton),
          state: bankButton === button
        } as SetIndicatorAction)
      }
    }
    if (button === ButtonId.Sound) {
      const action: SetViewAction = { type: EP133ActionKind.SET_VIEW, view: View.Sound }
      setDisplayValue('SOU')
      dispatch(action)
    } else if (button === ButtonId.Main) {
      const action: SetViewAction = { type: EP133ActionKind.SET_VIEW, view: View.Main }
      dispatch(action)
    } else if (button === ButtonId.Tempo) {
      const action: SetViewAction = { type: EP133ActionKind.SET_VIEW, view: View.Tempo }
      dispatch(action)
    }
    if (button === ButtonId.Play) {
      setIsPlaying(state => !state)
    }
    if (button === ButtonId.FX) {
      if (state.displayAnimation != 'odd-even') {
        dispatch({
          type: EP133ActionKind.SET_STATE,
          state: { displayAnimation: 'odd-even' }
        })
        setDisplayValue('')
      } else {
        dispatch({
          type: EP133ActionKind.SET_STATE,
          state: { displayAnimation: null }
        })
      }
    }
    const action: AddButtonAction = { type: EP133ActionKind.ADD_BUTTON, button }
    dispatch(action)
  }, [state])

  const handleXChange = useCallback((values) => {
    if (state.view === View.Tempo) {
      const newBpm = 120 + values
      setBpm(newBpm)
      setDisplayValue(newBpm.toString())
    } else if (state.view === View.Sound) {
      const newValue = normalize(values, -100, 100, 0, 100)
      setDisplayValue(newValue.toString())
    } else if (state.view === View.Main) {
      const norm = normalize(values, -100, 100, 0, 100)
      setDisplayValue('AMP')
      setSoundAmp(norm)
    }
  }, [state.view])

  const handleYChange = useCallback((values) => {
    if (state.view === View.Main) {
      const norm = normalize(values, -100, 100, 0, 100)
      setDisplayValue('PTC')
      setSoundPitch(norm)
    }
  }, [])

  const handleVolumeChange = useCallback((values) => {
    // const newValue = normalize(values, 0, 100, 50, 125)
    setVolume(values)
    setDisplayValue(values.toString())
  }, [state.view])

  const handlePower = useCallback((newState: boolean) => {
    const action: ManagePowerAction = {
      type: EP133ActionKind.POWER,
      state: newState
    }
    dispatch(action)
  }, [])

  const handleButtonHold = useCallback((button: ButtonId) => {
    if (!state.poweredOn) return
    if (button === ButtonId.Sound) {
      const action: SetStateAction = {
        type: EP133ActionKind.SET_STATE,
        state: {
          userInput: true,
          displayValue: (idx, { state }) => ('___' + state.inputBuffer).slice(-3),
          view: View.Sound
        }
      }
      dispatch(action)
    }
    const action: AddButtonAction = { type: EP133ActionKind.ADD_BUTTON, button }
    dispatch(action)
    const action2: SetStateAction = { type: EP133ActionKind.SET_STATE, state: { buttons: { ...state.buttons, [button]: { active: true } } } }
    dispatch(action2)
  }, [state])

  const handleBrickClick = useCallback((brick: BrickId) => {
    if (brick === BrickId.USB) {
      dispatch({ // eslint-disable-line
        type: EP133ActionKind.SET_STATE,
        state: {
          usbConnected: !state.usbConnected
        }
      } as SetStateAction)
    }
  }, [state])

  const [_, displayDots] = useMemo(() => [state.displayValue.toString(), state.displayDots], [state])

  useEffect(() => {
    const obs = new ResizeObserver(() => {
      const scaleFactor = Math.min(
        (document.documentElement.clientHeight - (32 * 2)) / 1500,
        (document.documentElement.clientWidth - (32 * 2)) / 1100
      )
      const scale = Math.min(
        1,
        scaleFactor
      )
      if (scaleByHeight) { // hide overflowin body area
        document.body.style.height = `${document.documentElement.clientHeight}px`
        document.body.style.overflow = 'hidden'
      }
      setDeviceScale(scale)
    })
    obs.observe(document.body, { box: 'border-box' })
    return () => {
      obs.disconnect()
    }
  })
  return (
    <div className='p-4 flex flex-col items-center justify-start bg-ep133-blue-50 dark:bg-ep133-blue-950'>
      <div
        className='flex flex-col scale-100 origin-top'
        style={{
          transform: `scale(${deviceScale})`
        }}
      >
        <div className='grid grid-cols-22 grid-rows-1 z-0 h-8 relative'>
          <div className='col-start-[17] col-span-2 flex flex-row justify-center transition-all' style={{ transform: `translateY(${state.usbConnected ? '125%' : '-100%'})` }}>
            <div className='rotate-180'>
              <USBCable />
            </div>
          </div>
        </div>
        <div className='z-10'>
          <EP133
            displayValue={state.poweredOn ? displayValue : ''}
            displayDotValue={displayDots as string}
            icons={icons}
            onButtonClick={handleButtonClick}
            onButtonHold={handleButtonHold}
            poweredOn={state.poweredOn}
            onPowerClick={handlePower}
            indicators={state.poweredOn ? state.indicators : {}}
            onBrickClick={handleBrickClick}
            displayAnimation={state.displayAnimation}
            onVolumeChange={handleVolumeChange}
            volume={volume}
            onXChange={handleXChange}
            onYChange={handleYChange}
          />
        </div>
      </div>
    </div>
  )
}

export const Head: HeadFC = () => (
  <>
    <title>EP133</title>
  </>
)
