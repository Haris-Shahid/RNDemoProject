import * as firebase from 'firebase';

export default class ReviewMiddleware {
    static handleReview(review, dUid) {
        return dispatch => {
            firebase.database().ref(`/user/${dUid}`).once('value', snap => {
                if (snap.val().reviews) {
                    let reviews = snap.val().reviews;
                    reviews.push(review)
                    firebase.database().ref(`/user/${dUid}/reviews/`).set(reviews)
                } else {
                    firebase.database().ref(`/user/${dUid}`).update({ reviews: [review] })
                }
            })
        }
    }
}