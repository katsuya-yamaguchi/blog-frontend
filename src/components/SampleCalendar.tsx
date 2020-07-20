import React, {useState} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import DatePicker, { registerLocale } from "react-datepicker";
import ja from 'date-fns/locale/ja'
import {createStyles, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      opacity: 0,
      visibility: 'hidden',
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: 1000,
      top: 0,
      left: 0,
      background: 'rgba(0, 0, 0, 0.3)'
    },
    form: {
      opacity: 0,
      visibility: 'hidden',
      position: 'fixed',
      top: '30%',
      left: '40%',
      fontWeight: 'bold',
      background: 'rgba(255, 255, 255)',
      width: '400px',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    inView: {
      opacity: 1,
      visibility: 'visible'
    },
  })
)

registerLocale('ja', ja)

const SampleCalendar: React.FC = props => {
  const classes = useStyles()

  /**
   * 予定を追加する際にCalendarオブジェクトのメソッドを使用する必要がある。
   * (CalendarオブジェクトはRef経由でアクセスする必要がある。)
   */
  const ref = React.createRef<any>()

  const [inputTitle, setInputTitle] = useState('') // フォームに入力されたタイトル。
  const [inputStart, setInputStart] = useState(new Date) // イベントの開始時刻。
  const [inputEnd, setInputEnd] = useState(new Date) // イベントの終了時刻。
  const [inView, setInView] = useState(false) // イベント登録フォームの表示有無。(trueなら表示する。)

  /**
   * カレンダーがクリックされた時にイベント登録用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 空欄
   *  - 開始: クリックしたカレンダーの開始時間
   *  - 終了: クリックしたカレンダーの終了時間
   */
  const handleCLick = () => {
    setInView(true)
  }

  /**
   * カレンダーから登録された予定をクリックした時にイベント変更用のフォームを表示する。
   * それぞれのフォームが下記の状態で表示される。
   *  - タイトル: 選択した予定のタイトル
   *  - 開始: 選択した予定の開始時間
   *  - 終了: 選択した予定の終了時間
   */
  const handleSelect = () => {
    setInView(true)
  }

  /**
   * カレンダーに予定を追加する。
   */
  const onAddEvent = () => {}

  /**
   * フォームが表示された時に、グレー背景でフォーム以外を非アクティブ化に見えるようにするための要素。
   */
  const coverElement = (
    <div
      onClick={() => setInView(false)}
      className={
        inView
          ? `${classes.cover} ${classes.inView}`
          : classes.cover
      }
    />
  )

  const titleElement = (
    <div>
      <label>タイトル</label>
      <input
        type="text"
        value={inputTitle}
        name="inputTitle"
        onChange={e => {
          setInputTitle(e.target.value)
        }}
      />
    </div>
  )

  const startTimeElement = (
    <div>
      <label>開始</label>
      <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        selected={inputStart}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputStart"
        onChange={(time: Date) => {
          setInputStart(time)
        }}
      />
    </div>
  )

  const endTimeElement = (
    <div>
      <label>終了</label>
      <DatePicker
        locale="ja"
        dateFormat="yyyy/MM/d HH:mm"
        selected={inputEnd}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={10}
        todayButton="today"
        name="inputEnd"
        onChange={(time: Date) => {
          setInputEnd(time)
        }}
      />
    </div>
  )

  const btnElement = (
    <div>
      <input
        type="button"
        value="キャンセル"
        onClick={() => {
          setInView(false)
        }}
      />
      <input
        type="button"
        value="保存"
        onClick={() => onAddEvent()}
      />
    </div>
  )

  const formElement = (
    <div
      className={
        inView
          ? `${classes.form} ${classes.inView}`
          : classes.form
      }
    >
      <form>
        <div>予定を入力</div>
        {titleElement}
        {startTimeElement}
        {endTimeElement}
        {btnElement}
      </form>
    </div>
  )

  return (
    <div>
      {coverElement}
      {formElement}
      <FullCalendar
        locale="ja"
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotDuration="00:30:00"
        selectable={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: '00:00',
          endTIme: '24:00'
        }}
        weekends={true}
        titleFormat={{
          year: 'numeric',
          month: 'short'
        }}
        headerToolbar={{
          start: 'title',
          center: 'prev, next, today',
          end: 'dayGridMonth,timeGridWeek'
        }}
        ref={ref}
        eventClick={handleCLick}
        select={handleSelect}
      />
    </div>
  )
}

export default SampleCalendar
