import { useDidMount, useDidUpdate } from 'rooks'
import { format } from 'date-fns'

type Props = {}

const TestLazy = ({}: Props) => {
  useDidMount(() => {
    console.log('useDidMount')
  })
  useDidUpdate(() => {
    console.log('useDidUpdate')
  }, [])
  return <div>LazyLoadable: {format(new Date(), 'MM/dd/yyyy')}</div>
}

export default TestLazy
