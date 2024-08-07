import c from './styles.module.css'

type Props = {}

const LazyComponent = ({}: Props) => {
  return <div className={c.container}>lazy green</div>
}

export default LazyComponent
