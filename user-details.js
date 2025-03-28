// Load and display subscriptions
function loadSubscriptions() {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    const subscriptions = JSON.parse(localStorage.getItem(`subscriptions_${username}`)) || [];
    const subscriptionList = document.getElementById('subscription-list');
    subscriptionList.innerHTML = '';
    subscriptions.forEach((sub, index) => {
        const subDiv = document.createElement('div');
        subDiv.innerHTML = `
            <p>${sub.platform} - Last used: ${sub.lastUsage}</p>
            <button onclick="removeSubscription(${index})">Remove</button>
        `;
        subscriptionList.appendChild(subDiv);
    });
    if (window.displayRecommendations) {
        window.displayRecommendations();
    }
}

// Add a new subscription
function addSubscription() {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    const platform = prompt('Enter platform name (e.g., Netflix):');
    const lastUsage = prompt('Enter last usage date (YYYY-MM-DD):');
    if (platform && lastUsage) {
        const subscriptions = JSON.parse(localStorage.getItem(`subscriptions_${username}`)) || [];
        subscriptions.push({ platform, lastUsage });
        localStorage.setItem(`subscriptions_${username}`, JSON.stringify(subscriptions));
        loadSubscriptions();
    } else {
        alert('Please provide both platform name and last usage date.');
    }
}

// Remove a subscription
window.removeSubscription = function(index) {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    const subscriptions = JSON.parse(localStorage.getItem(`subscriptions_${username}`)) || [];
    subscriptions.splice(index, 1);
    localStorage.setItem(`subscriptions_${username}`, JSON.stringify(subscriptions));
    loadSubscriptions();
};

// Event listener for adding subscriptions
document.getElementById('add-subscription').addEventListener('click', addSubscription);

// Initial load
loadSubscriptions();