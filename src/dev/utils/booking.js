
export const calculateTripCost = ({adultsNr, adultPrice, childrenNr, childrenPrice}) => {
    return adultsNr * adultPrice + childrenNr * childrenPrice;
}
