export const initialTickets = [
  {
    id: "1",
    title: 'ticket 1',
    content: 'this is the first ticket',
    status: 'DONE' as const
  },
  {
    id: "2",
    title: 'ticket 2',
    content: 'this is the second ticket',
    status: 'OPEN' as const
  },
  {
    id: "3",
    title: 'ticket 3',
    content: 'this is the third ticket',
    status: 'IN_PROGRESS' as const
  }
]