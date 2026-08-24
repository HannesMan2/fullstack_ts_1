import { useEffect, useState, type FormEvent } from 'react'
import type { DiaryEntry, NewDiaryEntry, Weather, Visibility } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/diaries')
      .then(response => response.json())
      .then(data => setDiaries(data))
  }, [])

  const addDiary = (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!date) {
      setError('Error: date is missing')
      return
    }

    if (!weather) {
      setError('Error: weather is missing')
      return
    }

    if (!visibility) {
      setError('Error: visibility is missing')
      return
    }

    if (comment.length > 200) {
      setError('Error: comment is too long')
      return
    }

    const newDiary: NewDiaryEntry = {
      date: date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment: comment
    }

    fetch('/api/diaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newDiary)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong')
        }

        return response.json()
      })
      .then(data => {
        setDiaries(diaries.concat(data))
        setDate('')
        setWeather('')
        setVisibility('')
        setComment('')
      })
      .catch(error => {
        setError(error.message)
      })
  }

  return (
    <div>
      <h1>Flight diaries</h1>

      <h2>Add new entry</h2>

      <form onSubmit={addDiary}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
        </div>

        <div>
          visibility

          <input
            type="radio"
            name="visibility"
            value="great"
            onChange={event => setVisibility(event.target.value)}
          />
          great

          <input
            type="radio"
            name="visibility"
            value="good"
            onChange={event => setVisibility(event.target.value)}
          />
          good

          <input
            type="radio"
            name="visibility"
            value="ok"
            onChange={event => setVisibility(event.target.value)}
          />
          ok

          <input
            type="radio"
            name="visibility"
            value="poor"
            onChange={event => setVisibility(event.target.value)}
          />
          poor
        </div>

        <div>
          weather

          <input
            type="radio"
            name="weather"
            value="sunny"
            onChange={event => setWeather(event.target.value)}
          />
          sunny

          <input
            type="radio"
            name="weather"
            value="rainy"
            onChange={event => setWeather(event.target.value)}
          />
          rainy

          <input
            type="radio"
            name="weather"
            value="cloudy"
            onChange={event => setWeather(event.target.value)}
          />
          cloudy

          <input
            type="radio"
            name="weather"
            value="stormy"
            onChange={event => setWeather(event.target.value)}
          />
          stormy

          <input
            type="radio"
            name="weather"
            value="windy"
            onChange={event => setWeather(event.target.value)}
          />
          windy
        </div>

        <div>
          comment
          <input
            value={comment}
            maxLength={200}
            onChange={event => setComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>

      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <h2>Diary entries</h2>

      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  )
}

export default App