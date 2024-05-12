import { useDidMount, useDidUpdate } from 'rooks'
import { format } from 'date-fns'
import { Button } from '@alfalab/core-components/button'

type Props = {}

const TestLazy = ({}: Props) => {
  useDidMount(() => {
    console.log('useDidMount')
  })
  useDidUpdate(() => {
    console.log('useDidUpdate')
  }, [])

  return (
    <div>
      <div>LazyLoadable: {format(new Date(), 'MM/dd/yyyy')}</div>
      <Button>@alfalab/core-components/button</Button>
    </div>
  )
}

export default TestLazy
