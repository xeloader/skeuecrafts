import { IconStates } from '../../../components/ep133-ui/DisplayMatrix'
import EP133, { Icon } from '../../../components/ep133-ui/EP133'
import React, { useMemo, useReducer, useState } from 'react'

interface EP133State {
  gridMode: 'quantised' | 'tics'
  shift: boolean
  userInput: boolean
  mute: boolean
  faderLevel: number
  bpm: number
  poweredOn: boolean
  project: number
}

const initState: EP133State = {
  gridMode: 'quantised',
  project: 1,
  shift: false,
  userInput: false,
  mute: false,
  faderLevel: 50,
  bpm: 120,
  poweredOn: true
}

enum EP133ActionKind {
  BPM
}

interface EP133Action {
  type: EP133ActionKind
}

interface BPMAction extends EP133Action {
  type: EP133ActionKind.BPM
  bpm: number
}

const reducer = (state: EP133State, action: EP133Action): EP133State => {
  switch (action.type) {
    case EP133ActionKind.BPM:
      return {
        ...state,
        bpm: (action as BPMAction).bpm
      }
    default:
      return state
  }
}

enum View {
  BPM,
  Sound,
  Edit,
  Timing,
  FX
}

const SubViews = {
  BPM: []
}

export default function EP133Page (): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initState)
  const [view, setView] = useState('')
  const icons = useMemo<IconStates>(() => {
    return {
      [Icon.Tic]: { glow: state.gridMode === 'tics' ? 1 : 0 },
      [Icon.Bar]: { glow: state.gridMode === 'quantised' ? 1 : 0 }
    }
  }, [state])
  return (
    <div>
      <div>
        <EP133
          icons={icons}
          poweredOn={state.poweredOn}
        />
      </div>
    </div>
  )
}
