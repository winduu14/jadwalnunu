// Google Sheets Configuration
const SPREADSHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
const SHEET_NAME = 'jadwal';
const API_KEY = 'YOUR_GOOGLE_API_KEY';
const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

// Fetch data from Google Sheets
async function fetchData() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return data.values;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Populate table with spreadsheet data
async function populateTable() {
    const data = await fetchData();
    const tbody = document.getElementById('scheduleBody');
    
    if (!data) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Gagal memuat data</td></tr>`;
        return;
    }

    // Skip header row
    const rows = data.slice(1);
    
    let html = '';
    rows.forEach(row => {
        html += `
            <tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${row[4]}</td>
                <td><span class="badge ${getStatusClass(row[5])}">${row[5]}</span></td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

function getStatusClass(status) {
    switch(status.toLowerCase()) {
        case 'selesai': return 'bg-success';
        case 'proses': return 'bg-warning text-dark';
        case 'batal': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

// Initial load
document.addEventListener('DOMContentLoaded', populateTable);