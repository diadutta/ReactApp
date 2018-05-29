//action creator helpers

export function incrementAction(value) {
    return {
        type: 'INCREMENT',
        payload: {
            value: value
        }
    }
}