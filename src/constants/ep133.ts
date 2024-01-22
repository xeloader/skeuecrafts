import { Colors } from '../types'

export const colorStyles: {
  [key in Colors]?: {
    textColor: string
    baseColor: string
    baseColorLight: string
    baseColorLighter: string
  }
} = {
  [Colors.Orange]: {
    textColor: 'white',
    baseColor: '#FE4612',
    baseColorLight: '#FF6C28',
    baseColorLighter: '#FFC386'
  },
  [Colors.Dark]: {
    textColor: '#EEF0F0',
    baseColor: '#191919',
    baseColorLight: '#3F3E3E',
    baseColorLighter: '#908E8D'
  },
  [Colors.DarkGray]: {
    textColor: '#EEF0F0',
    baseColor: '#535150',
    baseColorLight: '#858180',
    baseColorLighter: '#C4C2C1'
  },
  [Colors.LightGray]: {
    textColor: '#1C1B1B',
    baseColor: '#D1CBC8',
    baseColorLight: '#EAE7E6',
    baseColorLighter: '#FFFFFF'
  },
  [Colors.Gray]: {
    textColor: '#EEF0F0',
    baseColor: '#ADA8A5',
    baseColorLight: '#CAC3C1',
    baseColorLighter: '#F9F7F6'
  }
}
