import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.css'

import c from './styles.modules.css'

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

export const CarouselPage = () => {
  const [sliderRef] = useKeenSlider(sliderOptions, [])

  return (
    <div ref={sliderRef} className="keen-slider">
      {slides.map((data, index) => {
        return (
          <div key={index} className={`keen-slider__slide ${c.slide}`}>
            {index}
          </div>
        )
      })}
    </div>
  )
}
