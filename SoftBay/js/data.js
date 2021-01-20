import { beginRequest, endRequest } from './notification.js';
import API from './api.js';

const endpoints = {
    OFFERS: 'data/offers',
    OFFER_BY_ID: 'data/offers/'
};

const api = new API('16D9A8CB-7F24-7FB6-FFFB-9FE4F7F02B00', '95439EDD-B801-4A4B-B47A-21D52B5383E2', beginRequest, endRequest);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

export async function getAll() {

    return api.get(endpoints.OFFERS);
}

export async function createOffer(offer) {

    return api.post(endpoints.OFFERS, offer);
}

export async function getOfferById(id) {

    return api.get(endpoints.OFFER_BY_ID + id);
}

export async function editOffer(id, offer) {

    return api.put(endpoints.OFFER_BY_ID + id, offer);
}

export async function deletOffer(id) {

    return api.delete(endpoints.OFFER_BY_ID + id);
}

// export async function buy(id) {

//     const offer = await getOfferById(id);

//     return editOffer(id, { numberOfBuyers: offer.numberOfBuyers + 1 });
// }

export function checkResult(result) {

    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}