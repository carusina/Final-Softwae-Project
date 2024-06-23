function showPopup(message) {
    document.querySelector('#wishlist-popup .popup-body').textContent = message;
    document.querySelector('#wishlist-popup').classList.add('visible');
}

function closePopup() {
    document.querySelector('#wishlist-popup').classList.remove('visible');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-wishlist').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            var pname = this.dataset.pname;
            var id = this.dataset.id;
            var heartIcon = this.querySelector('i');

            fetch('/add-to-wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id, pname: pname })
            })
            .then(function(response) {
                if (response.ok) {
                    return response.text();  // Assuming the server returns a simple success message
                } else {
                    throw new Error('Failed to add item to wishlist.');
                }
            })
            .then(function(message) {
                heartIcon.classList.add('filled-heart');
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                showPopup(message);
                setTimeout(closePopup, 2000); // Close popup after 2 seconds
            })
            .catch(function(error) {
                console.error('Error adding to wishlist:', error);
                showPopup('Failed to add item to wishlist.');
            });
        });
    });
});
