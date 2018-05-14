import {playMode} from 'common/js/config'

const state = {
  singer: {},
  playing: false, // 播放状态（播放、暂停）
  fullScreen: false, // 播放器展开与收起
  playlist: [], // 播放列表
  sequenceList: [], // 顺序列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 当前播放索引
}

export default state