// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadFinanceData();
    updateWeekDate();
    updateLastUpdate();
});

// Load finance data
function loadFinanceData() {
    const savedData = localStorage.getItem('financeData');
    if (savedData) {
        const data = JSON.parse(savedData);
        console.log('Finance data loaded:', data);
    }
}

// Save finance data
function saveFinanceData(data) {
    localStorage.setItem('financeData', JSON.stringify(data));
    console.log('Finance data saved:', data);
}

// Update week date
function updateWeekDate() {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const dateStr = `${weekStart.toLocaleDateString('id-ID')} - ${weekEnd.toLocaleDateString('id-ID')}`;
    document.getElementById('weekDate').textContent = dateStr;
}

// Finance Update Form
function showFinanceForm() {
    document.getElementById('financeModal').style.display = 'block';
}

function closeFinanceForm() {
    document.getElementById('financeModal').style.display = 'none';
    document.getElementById('financeForm').reset();
}

function saveFinanceUpdate(event) {
    event.preventDefault();
    
    const update = {
        category: document.getElementById('financeCategory').value,
        amount: document.getElementById('financeAmount').value,
        notes: document.getElementById('financeNotes').value,
        timestamp: new Date().toLocaleString('id-ID')
    };

    // Get existing updates
    let updates = JSON.parse(localStorage.getItem('financeUpdates') || '[]');
    updates.push(update);
    localStorage.setItem('financeUpdates', JSON.stringify(updates));

    alert('✅ Finance update saved!');
    closeFinanceForm();
}

// Download Report
function downloadReport() {
    const report = {
        title: 'BEE Group Finance Report',
        generatedDate: new Date().toLocaleString('id-ID'),
        summary: {
            totalRevenue: 'Rp 5.2B',
            budgetSpent: 'Rp 3.8B',
            netProfit: 'Rp 1.4B'
        },
        updates: JSON.parse(localStorage.getItem('financeUpdates') || '[]')
    };

    const reportStr = JSON.stringify(report, null, 2);
    const reportBlob = new Blob([reportStr], { type: 'application/json' });
    const url = URL.createObjectURL(reportBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `finance-report-${new Date().getTime()}.json`;
    link.click();
}

// Send Alert
function sendAlert() {
    alert('✅ Alert notification sent to stakeholders!');
}

// Update Last Update Time
function updateLastUpdate() {
    document.getElementById('lastUpdate').textContent = new Date().toLocaleDateString('id-ID');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const financeModal = document.getElementById('financeModal');
    if (event.target == financeModal) {
        financeModal.style.display = 'none';
    }
};