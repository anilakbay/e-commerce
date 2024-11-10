'use client'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const targetDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 gün sonrası

    const updateCountdown = () => {
      const currentTime = new Date().getTime()
      const timeDifference = Math.max(targetDate.getTime() - currentTime, 0)

      setTime({
        days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
      })
    }

    const timerInterval = setInterval(updateCountdown, 1000)

    return () => clearInterval(timerInterval)
  }, []) // Boş bağımlılık dizisiyle yalnızca ilk renderda çalışır

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Enjoy exclusive perks and offers with our Deals of the Month! Don't miss out on amazing
          discounts and a shopping experience you’ll love. 🎁🛒
        </p>

        <ul className={classes.stats}>
          {Object.entries(time).map(([label, value]) => (
            <StatBox
              key={label}
              label={label.charAt(0).toUpperCase() + label.slice(1)}
              value={value}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

export default Promotion
