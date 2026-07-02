# 🐝 BEE Group Dashboard

Real-time Status Tracking Dashboard with KPI Monitoring, Weekly Updates, and Finance Management.

## 📊 Features

- **Real-time Status Tracking** - Dashboard live dengan traffic light indicators
- **KPI Tracker** - Monitor target vs actual untuk setiap unit
- **Weekly Updates** - Form input untuk pencapaian, bottleneck, dan rencana aksi
- **Activity Log** - Timeline aktivitas stakeholders
- **Auto-save** - Semua perubahan otomatis tersimpan menggunakan Browser LocalStorage
- **Finance Dashboard** - Monitor revenue, expenses, dan cash flow
- **Responsive Design** - Mobile-friendly interface

## 📁 File Structure

```
bee-group-dashboard/
├── index.html                    # Landing page
├── bee-group-workflow.html       # Main dashboard dengan KPI tracking
├── bee-group-finance-page.html   # Finance unit detail
├── styles.css                    # Global styles
├── workflow.css                  # Workflow-specific styles
├── finance.css                   # Finance-specific styles
├── workflow.js                   # Workflow functionality
├── finance.js                    # Finance functionality
└── README.md                     # Documentation
```

## 🚀 Deployment

Menggunakan GitHub Pages. Setiap commit ke `main` branch otomatis deploy.

### Setup GitHub Pages:

1. Pastikan repository bersifat **Public**
2. Go to Settings → Pages
3. Pilih `main` branch sebagai source
4. Tunggu beberapa menit untuk deployment
5. Akses via: `https://tataruangalamsemesta-crypto.github.io/bee-group-dashboard`

## 💻 Usage

### Workflow Dashboard
- View real-time status untuk setiap unit (Sales, Marketing, Operations, HR)
- Monitor KPI progress dengan visual indicators
- Submit weekly updates dengan achievement, bottleneck, dan action plan
- Track activity log dari semua stakeholders

### Finance Dashboard
- Monitor revenue, budget, dan profit
- View detailed financial metrics
- Track cash flow analysis
- Manage alerts dan action items

## 🔐 Data Storage

Semua data disimpan di Browser LocalStorage:
- `workflowData` - Workflow dashboard data
- `weeklyUpdates` - Weekly update submissions
- `financeData` - Finance dashboard data
- `financeUpdates` - Finance update submissions

⚠️ **Note**: Data akan hilang jika cache browser dihapus. Untuk backup, gunakan Export function.

## 📱 Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers

## 📄 License

All rights reserved © 2026 BEE Group
