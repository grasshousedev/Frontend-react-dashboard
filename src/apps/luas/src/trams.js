export function getTramsByDirection(stopInfo, direction) {
    const tramsDirection = stopInfo.direction.filter(d => d._attributes.name === direction);

    if (!tramsDirection || tramsDirection.length === 0) return null;

    return getTrams(tramsDirection[0].tram.length ? tramsDirection[0].tram : [tramsDirection[0].tram]);
}

function getTrams(trams) {
    if (!trams || trams.length === 0) return null;

    return trams.map(tram => ({
        due: parseInt(tram._attributes.dueMins) || tram._attributes.dueMins,
        destination: tram._attributes.destination,
    }));
}
