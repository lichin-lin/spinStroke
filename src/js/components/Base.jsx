import React, { Component, PropTypes } from 'react'
import {
    Grid,
    Row
} from 'react-bootstrap'

export default class Base extends Component {
    static propTypes = {
        requiredProps: PropTypes.string.isRequired,
        defaultProps: PropTypes.string
    };
    static defaultProps = {
        defaultProps: 'default props'
    };
    render () {
        return (
            <Grid>
                <Row>
                    <div className="info_section">
                        <h2>關於 學測:</h2>
                        <div className="info_content">
                            大學學科能力測驗 (General Scholastic Ability Test)
                            是一種用於測驗高中學生，
                            是否具備基本的知識，
                            以進入台灣各大學就讀的大型考試，
                            由大學入學考試中心(大考中心)負責統籌舉辦。
                        </div>
                    </div>
                </Row>
              <Row>
                  <div className="info_section">
                      <h2>關於 級分計算機:</h2>
                      <div className="info_content">
                          這是一個單純的學測級分計算機，
                          此服務並非由教育部任何相關機構維護，
                          只是提供一個個人學習上練習的作品，
                          其資料也不會有其他任何用途的使用，
                          若是有任何疑問、建議歡迎透過以下方式聯絡:
                          <a href="mailto:vic20087cjimlin@gmail.com?subject=[SAT.me] 相關問題提問"> vic20087cjimlin@gmail.com</a>
                      </div>
                  </div>
              </Row>
              <Row>
                  <div className="info_section">
                      <h2>關於 本練習:</h2>
                      <div className="info_content">
                          本練習使用 react-redux 框架製作而成，
                          將資料放在 firebase 上面並做了權限處理，
                          以防止資料被任意更改。未來會再加上離線功能以及手機 app 版本(主要使用 PWA)，
                          讓使用更加方便。如果對於此作品有興趣或這是需要一些範例，
                          歡迎到 <a href="https://github.com/lichin-lin" target="_blank">github</a> 上給我個<span className="star">星星</span>並使用看看，謝謝。
                      </div>
                  </div>
              </Row>
              <Row>
                  <div className="info_section">
                      <h2>關於 作者:</h2>
                      <div className="info_content">
                          作者目前就讀大學，平常沒事喜歡看一些設計、繪畫，
                          並製作些小作品給大家使用當做自我的練習，
                          如果對於我的作品感興趣的人歡迎到下面看看 :D
                          <br/>
                          <a href="https://lichin.me" className="web" target="_blank">個人網頁</a>
                          <a href="https://github.com/lichin-lin" className="web" target="_blank">Github</a>
                          <a href="https://www.behance.net/lichin-lin" className="web" target="_blank">一些小設計</a>
                      </div>
                  </div>
              </Row>
            </Grid>
        )
    }
}
