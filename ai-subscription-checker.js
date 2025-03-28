// Display AI recommendations with fixed threshold
window.displayRecommendations = function() {
    const username = localStorage.getItem('currentUser');
    if (!username) return;
    const subscriptions = JSON.parse(localStorage.getItem(`subscriptions_${username}`)) || [];
    const recommendationList = document.getElementById('recommendation-list');
    recommendationList.innerHTML = '';
    const today = new Date();
    const threshold = 15; // Fixed threshold, not visible to user
    subscriptions.forEach(sub => {
        const lastUsageDate = new Date(sub.lastUsage);
        const diffTime = today - lastUsageDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > threshold) {
            const recDiv = document.createElement('div');
            recDiv.innerHTML = `<p>Recommend canceling ${sub.platform} (last used ${diffDays} days ago)</p>`;
            recommendationList.appendChild(recDiv);
        }
    });
};

// Initial display
window.displayRecommendations();