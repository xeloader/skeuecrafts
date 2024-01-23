import { IconStates } from '../../../components/ep133-ui/DisplayMatrix'
import EP133, { ButtonId, Icon } from '../../../components/ep133-ui/EP133'
import React, { useCallback, useMemo, useReducer, useState } from 'react'
interface Sound {
  id: number
  type: 'stereo' | 'mono'
}
interface SoundBank {
  [key: number]: Sound
}

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
  displayValue: string
  displayDots: string
  buttonHistory: ButtonId[]
  inputBuffer: string
  expectingInput: boolean
}

enum View {
  BPM,
  Sound,
  Edit,
  Main,
  Timing,
  FX,
  Tempo
}

enum EP133ActionKind {
  BPM,
  SET_VIEW,
  ADD_BUTTON,
  SET_STATE
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

interface SetStateAction extends EP133Action {
  type: EP133ActionKind.SET_STATE
  state: Partial<EP133State>
}

const initState: EP133State = {
  view: View.Main,
  gridMode: 'quantised',
  displayValue: '111',
  buttonHistory: [],
  displayDots: '..',
  project: 1,
  shift: false,
  userInput: false,
  mute: false,
  faderLevel: 50,
  bpm: 120,
  poweredOn: true,
  projectSounds: {},
  inputBuffer: '',
  expectingInput: false
}

const reducer = (state: EP133State, action: EP133Action): EP133State => {
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
    default:
      return state
  }
}

const SubViews = {
  BPM: []
}

function isSoundPad (button: ButtonId): boolean {
  return button === ButtonId.Digit0 ||
    button === ButtonId.Digit1 ||
    button === ButtonId.Digit2 ||
    button === ButtonId.Digit3 ||
    button === ButtonId.Digit4 ||
    button === ButtonId.Digit5 ||
    button === ButtonId.Digit6 ||
    button === ButtonId.Digit7 ||
    button === ButtonId.Digit8 ||
    button === ButtonId.Digit9 ||
    button === ButtonId.Dot ||
    button === ButtonId.Enter
}

function isInputButton (button: ButtonId, includeDot: boolean = false): boolean {
  return button === ButtonId.Digit0 ||
    button === ButtonId.Digit1 ||
    button === ButtonId.Digit2 ||
    button === ButtonId.Digit3 ||
    button === ButtonId.Digit4 ||
    button === ButtonId.Digit5 ||
    button === ButtonId.Digit6 ||
    button === ButtonId.Digit7 ||
    button === ButtonId.Digit8 ||
    button === ButtonId.Digit9 ||
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

export default function EP133Page (): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initState)
  const icons = useMemo<IconStates>(() => {
    const display: IconStates = {}
    if (state.view === View.Main) {
      display[Icon.Tic] = { glow: state.gridMode === 'tics' ? 1 : 0 }
      display[Icon.Bar] = { glow: state.gridMode === 'quantised' ? 1 : 0 }
      display[Icon.Main] = { glow: 1 }
    } else if (state.view === View.Sound) {
      display[Icon.Sound] = { glow: 1 }
    } else if (state.view === View.Tempo) {
      display[Icon.Tempo] = { glow: 1 }
    }
    if (state.userInput) {
      display[Icon.Finger] = { glow: 1 }
    }
    return display
  }, [state])
  const handleButtonClick = useCallback((button: ButtonId) => {
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
    if (button === ButtonId.Sound) {
      const action: SetViewAction = { type: EP133ActionKind.SET_VIEW, view: View.Sound }
      dispatch(action)
    } else if (button === ButtonId.Main) {
      const action: SetViewAction = { type: EP133ActionKind.SET_VIEW, view: View.Main }
      dispatch(action)
    } else if (button === ButtonId.Tempo) {
      const action: SetViewAction = { type: EP133ActionKind.SET_VIEW, view: View.Tempo }
      dispatch(action)
    }
    const action: AddButtonAction = { type: EP133ActionKind.ADD_BUTTON, button }
    dispatch(action)
  }, [state])

  const handleButtonHold = useCallback((button: ButtonId) => {
    if (button === ButtonId.Sound) {
      const action: SetStateAction = {
        type: EP133ActionKind.SET_STATE,
        state: {
          userInput: true,
          view: View.Sound
        }
      }
      dispatch(action)
    }
    const action: AddButtonAction = { type: EP133ActionKind.ADD_BUTTON, button }
    dispatch(action)
  }, [])

  const [displayValue, displayDots] = useMemo<[string, string]>(() => {
    if (state.userInput) {
      return [state.inputBuffer, '']
    } else {
      return [state.displayValue, state.displayDots]
    }
  }, [state])
  return (
    <div className='p-4'>
      <div className='flex flex-row justify-center items-center'>
        <div className='scale-50 origin-top'>
          <EP133
            displayValue={displayValue}
            displayDotValue={displayDots}
            icons={icons}
            onButtonClick={handleButtonClick}
            onButtonHold={handleButtonHold}
            poweredOn={state.poweredOn}
          />
        </div>
      </div>
    </div>
  )
}
