import axios from 'axios';

class BookingAPIs {
    static getTripList(start_id, end_id, chosen_date, fleet) {
        return axios.get('http://165.227.144.209/admin-panel/api/search', {
             params: {
                start_point: start_id,
                end_point: end_id,
                date: chosen_date,
                fleet_type: fleet
             }
        }).then(function (response) {
                return response.data.response.trip_list;
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    static getTripSeatsApi(params) {
        return axios.get(`http://165.227.144.209/admin-panel/api/getTripSeats`, {params}
        ).then(function (response) {
            return response.data.seats;
        })
        .catch(function (error) {
            console.log(error);
        })
    }
}

export default BookingAPIs;