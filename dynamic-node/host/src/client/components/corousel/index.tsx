import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.css'

const slides = Array.from({ length: 9 }).map(() => '')

const sliderOptions: KeenSliderOptions = {
  slideChanged() {
    console.log('slide changed')
  },
  slides: {
    perView: 3,
    spacing: 15,
  },
}

export const Carousel = () => {
  const [sliderRef] = useKeenSlider(sliderOptions, [])

  return (
    <div ref={sliderRef} className="keen-slider" style={{ width: '300px', padding: '10px 0' }}>
      {slides.map((data, index) => {
        return (
          <div key={index} className={`keen-slider__slide`}>
            {index}
          </div>
        )
      })}
    </div>
  )
}
