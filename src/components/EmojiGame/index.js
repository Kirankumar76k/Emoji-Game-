/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/

// Write your code here.

// import {Component} from 'react'
// import NavBar from '../NavBar'
// import EmojiCard from '../EmojiCard'
// import WinOrLoseCard from '../WinOrLoseCard'
// import './index.css'

// class EmojiGame extends Component {
//   state = {
//     isGameInProgress: true,
//     topScore: 0,
//     ClickedEmojiList: [],
//   }

//   stopGameAndDisplayScore = currentScore => {
//     const {topScore} = this.state
//     let newScore = currentScore
//     if (currentScore > topScore) {
//       newScore = currentScore
//     }
//     this.setState({topScore: newScore, isGameInProgress: false})
//   }

//   shuffledEmojisList = () => {
//     const {emojisList} = this.props
//     return emojisList.sort(() => Math.random() - 0.5)
//   }

//   onEmojiBtnClick = id => {
//     const {emojisList} = this.props
//     const {ClickedEmojiList} = this.state
//     const isEmojiClicked = ClickedEmojiList.includes(id)
//     const lengthOfClickedList = ClickedEmojiList.length
//     if (isEmojiClicked) {
//       this.stopGameAndDisplayScore(lengthOfClickedList)
//     } else {
//       if (lengthOfClickedList === emojisList.length - 1) {
//         this.stopGameAndDisplayScore(emojisList.length)
//       }
//       this.setState(prevState => ({
//         ClickedEmojiList: [...prevState.ClickedEmojiList, id],
//       }))
//     }
//   }

//   getShuffledEmojiList = () => {
//     const shuffledEmojis = this.shuffledEmojisList()
//     return (
//       <ul className="item-list">
//         {shuffledEmojis.map(eachItem => (
//           <EmojiCard
//             key={eachItem.id}
//             emojiDetails={eachItem}
//             onEmojiBtnClick={this.onEmojiBtnClick}
//           />
//         ))}
//       </ul>
//     )
//   }

//   GetWinOrLose = () => {
//     const {ClickedEmojiList} = this.state
//     const {emojisList} = this.props
//     const isGameWon = ClickedEmojiList.length === emojisList.length
//     return (
//       <WinOrLoseCard
//         isGameWon={isGameWon}
//         onPlayAgain={this.resetGame}
//         score={ClickedEmojiList.length}
//       />
//     )
//   }

//   render() {
//     const {topScore, ClickedEmojiList, isGameInProgress} = this.state

//     return (
//       <div className="bg-container">
//         <NavBar topScore={topScore} score={ClickedEmojiList.length} />
//         <div className="body-container">
//           {isGameInProgress ? this.getShuffledEmojiList() : this.GetWinOrLose()}
//         </div>
//       </div>
//     )
//   }
// }
// export default EmojiGame
import {Component} from 'react'

import EmojiCard from '../EmojiCard'
import NavBar from '../NavBar'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojisList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojisList: [], isGameInProgress: true})
  }

  renderScoreCard = () => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isWon = clickedEmojisList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojisList.length}
      />
    )
  }

  finishGameAndSetTopScore = currentScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (currentScore > topScore) {
      newTopScore = currentScore
    }

    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {emojisList} = this.props
    const {clickedEmojisList} = this.state
    const isEmojiPresent = clickedEmojisList.includes(id)
    const clickedEmojisLength = clickedEmojisList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }
      this.setState(previousState => ({
        clickedEmojisList: [...previousState.clickedEmojisList, id],
      }))
    }
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props

    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojisList = this.getShuffledEmojisList()

    return (
      <ul className="emojis-list-container">
        {shuffledEmojisList.map(emojiObject => (
          <EmojiCard
            key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojisList, isGameInProgress, topScore} = this.state

    return (
      <div className="app-container">
        <NavBar
          currentScore={clickedEmojisList.length}
          isGameInProgress={isGameInProgress}
          topScore={topScore}
        />
        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
