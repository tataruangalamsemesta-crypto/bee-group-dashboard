// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    updateLastUpdate();
});

// Load data from localStorage
function loadData() {
    const savedData = localStorage.getItem('workflowData');
    if (savedData) {
        const data = JSON.parse(savedData);
        console.log('Loaded data:', data);
    }
}

// Save data to localStorage
function saveData(data) {
    localStorage.setItem('workflowData', JSON.stringify(data));
    console.log('Data saved:', data);
}

// Weekly Update Form
function showWeeklyForm() {
    document.getElementById('weeklyModal').style.display = 'block';
}

function closeWeeklyForm() {
    document.getElementById('weeklyModal').style.display = 'none';
    document.getElementById('weeklyForm').reset();
}

function saveWeeklyUpdate(event) {
    event.preventDefault();
    
    const update = {
        unit: document.getElementById('unitName').value,
        achievement: document.getElementById('achievement').value,
        bottleneck: document.getElementById('bottleneck').value,
        actionPlan: document.getElementById('actionPlan').value,
        timestamp: new Date().toLocaleString('id-ID')
    };

    // Get existing updates
    let updates = JSON.parse(localStorage.getItem('weeklyUpdates') || '[]');
    updates.push(update);
    localStorage.setItem('weeklyUpdates', JSON.stringify(updates));

    // Add to activity log
    addActivityLog(`${update.unit} - Weekly Update submitted`);

    alert('✅ Weekly update saved!');
    closeWeeklyForm();
}

// Details Modal
function showDetails(unit) {
    const detailsModal = document.getElementById('detailsModal');
    document.getElementById('detailsTitle').textContent = `${unit} - Details`;
    
    let content = '';
    switch(unit) {
        case 'Sales':
            content = `
                <div style="padding: 1.5rem;">
                    <h4>Sales Performance</h4>
                    <p>Revenue: Rp 850M / Rp 1B (85%)</p>
                    <p>New Customers: 92 / 100 (92%)</p>
                    <h4 style="margin-top: 1rem;">Recent Updates</h4>
                    <p>✅ Closed 3 major deals this week</p>
                    <p>✅ Customer satisfaction: 4.8/5</p>
                </div>
            `;
            break;
        case 'Marketing':
            content = `
                <div style="padding: 1.5rem;">
                    <h4>Marketing Performance</h4>
                    <p>Campaign Reach: 6.5M / 10M (65%)</p>
                    <p>Engagement: 7.2% / 10% (72%)</p>
                    <h4 style="margin-top: 1rem;">Action Items</h4>
                    <p>⚠️ Increase social media budget</p>
                    <p>⚠️ Optimize campaign targeting</p>
                </div>
            `;
            break;
        case 'Operations':
            content = `
                <div style="padding: 1.5rem;">
                    <h4>Operations Performance</h4>
                    <p>Delivery On-time: 58 / 100 (58%)</p>
                    <p>Cost Control: Rp 62M / Rp 100M (62%)</p>
                    <h4 style="margin-top: 1rem;">Bottlenecks</h4>
                    <p>🔴 Supply chain delays</p>
                    <p>🔴 Staff shortage in logistics</p>
                </div>
            `;
            break;
        case 'HR':
            content = `
                <div style="padding: 1.5rem;">
                    <h4>HR Performance</h4>
                    <p>Recruitment: 22 / 25 (88%)</p>
                    <p>Training Completion: 95 / 100 (95%)</p>
                    <h4 style="margin-top: 1rem;">Highlights</h4>
                    <p>✅ Onboarded 8 new employees</p>
                    <p>✅ Completed leadership training</p>
                </div>
            `;
            break;
    }
    
    document.getElementById('detailsContent').innerHTML = content;
    detailsModal.style.display = 'block';
}

function closeDetails() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Activity Log
function addActivityLog(message) {
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const activityLog = document.getElementById('activityLog');
    
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item';
    newActivity.innerHTML = `
        <div class="activity-time">Hari ini, ${time}</div>
        <div class="activity-content">${message}</div>
    `;
    
    activityLog.insertBefore(newActivity, activityLog.firstChild);
}

// Export Data
function exportData() {
    const data = {
        updates: JSON.parse(localStorage.getItem('weeklyUpdates') || '[]'),
        exportDate: new Date().toLocaleString('id-ID')
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bee-dashboard-${new Date().getTime()}.json`;
    link.click();
    
    addActivityLog('📥 Data exported');
}

// Clear Data
function clearData() {
    if (confirm('⚠️ Are you sure you want to clear all data?')) {
        localStorage.clear();
        location.reload();
    }
}

// Update Last Update Time
function updateLastUpdate() {
    document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('id-ID');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const weeklyModal = document.getElementById('weeklyModal');
    const detailsModal = document.getElementById('detailsModal');
    
    if (event.target == weeklyModal) {
        weeklyModal.style.display = 'none';
    }
    if (event.target == detailsModal) {
        detailsModal.style.display = 'none';
    }
};