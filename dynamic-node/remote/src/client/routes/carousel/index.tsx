import { useKeenSlider } from 'keen-slider/react'

import 'keen-slider/keen-slider.min.css'

export const CarouselPage = () => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged() {
        console.log('slide changed')
      },
      slides: {
        perView: 1,
        spacing: 15,
      },
    },
    []
  )

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide">1</div>
      <div className="keen-slider__slide">2</div>
      <div className="keen-slider__slide">3</div>
    </div>
  )
}
