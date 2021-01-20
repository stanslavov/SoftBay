import { getAll, createOffer, checkResult, getOfferById, editOffer, deletOffer as apiDelete } from '../data.js';
import { showInfo, showError } from '../notification.js';

export default async function home() {

    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const context = Object.assign({}, this.app.userData);

    this.partial('./templates/home.hbs', context);
}

export async function catalog() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        catalog: await this.load('./templates/catalog/catalog.hbs'),
        offer: await this.load('./templates/catalog/offer.hbs'),
    };

    const context = Object.assign({}, this.app.userData);

    if (this.app.userData) {
        const offers = await getAll();

        for (const offer of offers) {
            if (offer.ownerId === this.app.userData.userId) {
                offer.canEdit = true;
            }
        }

        context.offers = offers;
    }

    this.partial('./templates/catalog/catalog.hbs', context);
}

export async function createPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    this.partial('./templates/catalog/create.hbs', this.app.userData);
}

export async function createPost() {

    const offer = {
        product: this.params.product,
        description: this.params.description,
        price: this.params.price,
        pictureUrl: this.params.pictureUrl
    };

    try {

        if (!offer.product) {
            throw new Error('Product cannot be empty');
        }
        if (!offer.description) {
            throw new Error('Description cannot be empty');
        }
        if (!offer.price) {
            throw new Error('Price cannot be empty');
        }
        if (offer.pictureUrl.slice(0, 7) !== 'http://' && offer.pictureUrl.slice(0, 8) !== 'https://') {
            throw new Error('Invalid image URL');
        }

        const result = await createOffer(offer);
        checkResult(result);

        showInfo('Offer created successfully!');

        this.redirect('#/catalog');
    } catch (err) {
        showError(err.message);
    }
}

export async function editPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        catalog: await this.load('./templates/catalog/catalog.hbs'),
    };

    const offer = await getOfferById(this.params.id);
    const context = Object.assign({ offer }, this.app.userData);

    await this.partial('./templates/catalog/edit.hbs', context);
}

export async function editPost() {

    const id = this.params.id;

    const offer = await getOfferById(id);

    offer.product = this.params.product;
    offer.description = this.params.description;
    offer.price = this.params.price;
    offer.pictureUrl = this.params.pictureUrl

    try {

        if (!offer.product) {
            throw new Error('Product cannot be empty');
        }
        if (!offer.description) {
            throw new Error('Description cannot be empty');
        }
        if (!offer.price) {
            throw new Error('Price cannot be empty');
        }
        if (offer.pictureUrl.slice(0, 7) !== 'http://' && offer.pictureUrl.slice(0, 8) !== 'https://') {
            throw new Error('Invalid image URL');
        }

        const result = await editOffer(id, offer);
        checkResult(result);

        showInfo('Offer edited successfully');

        this.redirect('#/catalog');
    } catch (err) {
        showError(err.message);
    }
}

export async function detailsPage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
    };

    const offer = await getOfferById(this.params.id);
    const context = Object.assign({ offer }, this.app.userData);

    this.partial('./templates/catalog/details.hbs', context);
}

// export async function buyProduct() {

//     this.partials = {
//         header: await this.load('./templates/common/header.hbs'),
//         footer: await this.load('./templates/common/footer.hbs'),
//     };

//     const id = this.params.id;
//     const person = this.app.userData.userId;

//     try {

//         const result = await buy(id);
//         checkResult(result);

//         const offer = await getOfferById(id);

//         offer.people.push(person);

//         const context = Object.assign({ offer }, this.app.userData);

//         if (offer.people.includes(person)) {
//             offer.wasBought = true;
//         }

//         this.partial('./templates/catalog/details.hbs', context);

//         //showError(wasBought)

//         //showInfo('You liked that recipe');

//         this.redirect('#/home');
//     } catch (err) {
//         showError(err.message);
//     }
// }

export async function deletePage() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs'),
        footer: await this.load('./templates/common/footer.hbs'),
        catalog: await this.load('./templates/catalog/catalog.hbs'),
    };

    const offer = await getOfferById(this.params.id);
    const context = Object.assign({ offer }, this.app.userData);

    await this.partial('./templates/catalog/delete.hbs', context);
}

export async function deleteOffer() {

    const id = this.params.id;
    try {

        const result = await apiDelete(id);
        checkResult(result);

        showInfo('Successfully deleted offer');

        this.redirect('#/catalog');
    } catch (err) {
        showError(err.message);
    }
}