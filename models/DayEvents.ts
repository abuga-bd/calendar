import Event from '@/models/Event'

export default interface DayEvents {
    date: string,
    events: [Event]
}