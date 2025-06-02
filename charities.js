// Charity management system
class CharityManager {
    constructor() {
        this.charities = [];
        this.totalDonated = 200;
        this.treesFunded = 500;
        
        this.init();
    }
    
    init() {
        this.loadCharities();
        this.setupEventListeners();
        this.renderCharities();
        this.updateStats();
        this.updateNextRecipient();
    }
    
    loadCharities() {
        // Define your charities directly in the code here
        // Simply add new charity objects to this array
        this.charities = [
            // Example charity - you can modify or remove this
            {
                id: 1,
                name: "Trees for the Future",
                location: "Silver Spring, MD, USA",
                description: "Planting trees to restore degraded lands and improve livelihoods of impoverished farmers worldwide through sustainable agroforestry practices. Our Forest Garden approach helps communities become self-sufficient while restoring the environment.",
                website: "https://trees.org",
                focus: "reforestation",
                image: "treesfor.png", // Add image URL here
                additionalInfo: "Trees for the Future works with communities in Sub-Saharan Africa to plant trees that provide food, income, and environmental benefits. Their Forest Garden approach transforms degraded land into thriving ecosystems." // Add more detailed information here
            },
            {
                id: 2,
                name: "American Forest Foundation",
                location: "USA",
                description: "Together We Can Plant More Trees. Planting a billion trees can help us curb the effects of climate change.",
                website: "https://www.forestfoundation.org/",
                focus: "reforestation",
                image: "affnon.png", // Add image URL here
                additionalInfo: "The Nature Conservancy's Plant a Billion Trees campaign is a major forest restoration effort focused on planting trees where they are needed most." // Add more detailed information here
            },
            {
                id: 3,
                name: "Tree Canada",
                location: "Canada",
                description: "Planting Trees in the Right Places",
                website: "https://treecanada.ca/",
                focus: "reforestation",
                image: "canada.png", // Add image URL here
                additionalInfo: "Tree Canada is the only national non-profit organization dedicated to planting and nurturing trees in rural and urban environments, in every province across the country. Since 1992, Tree Canada has worked relentlessly to grow Canada’s tree canopy through our greening programs, research, and engagement efforts. Together with our partners, we plant millions of trees each year to grow resilient ecosystems and healthier, greener communities" // Add more detailed information here
            },
            {
                id: 4,
                name: "Forests Canada",
                location: "Canada",
                description: "Restoring landscapes. Connecting communities. Growing economies.",
                website: "https://forestscanada.ca/en",
                focus: "reforestation",
                image: "forestcanada.png", // Add image URL here
                additionalInfo: "From seed to survival to sustainability, we have proudly built the infrastructure and network needed to deliver forest restoration programs focused on improving forest health and advocating for healthy ecosystems, while also inspiring communities to connect with our forests." // Add more detailed information here
            },
            {
                id: 5,
                name: "One Tree Planted",
                location: "USA",
                description: "Grow a Greener Future. One Tree at a Time",
                website: "https://onetreeplanted.org/",
                image: "onetre.png", // Add image URL here
                focus: "Reforestation",
                additionalInfo: "From seed to survival to sustainability, we have proudly built the infrastructure and network needed to deliver forest restoration programs focused on improving forest health and advocating for healthy ecosystems, while also inspiring communities to connect with our forests." // Add more detailed information here
            }
        ];
        
        // Load saved stats
        const savedStats = localStorage.getItem('treecoin-stats');
        if (savedStats) {
            const stats = JSON.parse(savedStats);
            this.totalDonated = stats.totalDonated || 200;
            this.treesFunded = stats.treesFunded || 500;
        }
    }
    
    saveStats() {
        const statsData = {
            totalDonated: this.totalDonated,
            treesFunded: this.treesFunded
        };
        
        localStorage.setItem('treecoin-stats', JSON.stringify(statsData));
    }
    
    setupEventListeners() {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    visitWebsite(url) {
        window.open(url, '_blank');
    }
    
    renderCharities() {
        const grid = document.getElementById('charities-grid');
        
        if (this.charities.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No charity partners yet</h3>
                    <p>Charity partners will be added by the TreeCoin team and displayed here.</p>
                </div>
            `;
            return;
        }
        
        grid.innerHTML = this.charities.map(charity => `
            <div class="charity-card fade-in" onclick="charityManager.openCharityModal(${charity.id})">
                <div class="charity-image">
                    ${charity.image ? 
                        `<img src="${charity.image}" alt="${charity.name}">` :
                        `<div class="charity-image-placeholder">🌳</div>`
                    }
                </div>
                <div class="charity-content">
                    <div class="charity-header">
                        <h3 class="charity-name">${charity.name}</h3>
                        <div class="charity-location">${charity.location}</div>
                    </div>
                    
                    <p class="charity-description">${charity.description}</p>
                    
                    <div class="charity-focus-badge">${charity.focus}</div>
                    <div class="read-more-hint">Click to learn more</div>
                </div>
            </div>
        `).join('');
        
        // Trigger fade-in animations
        setTimeout(() => {
            document.querySelectorAll('.charity-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 100);
    }
    
    openCharityModal(id) {
        const charity = this.charities.find(c => c.id === id);
        if (!charity) return;
        
        const modal = document.getElementById('charity-modal');
        const content = document.getElementById('modal-charity-content');
        
        content.innerHTML = `
            <div class="modal-charity-image">
                ${charity.image ? 
                    `<img src="${charity.image}" alt="${charity.name}">` :
                    `<div class="modal-charity-image-placeholder">🌳</div>`
                }
            </div>
            
            <div class="modal-charity-header">
                <h2 class="modal-charity-name">${charity.name}</h2>
                <div class="modal-charity-location">${charity.location}</div>
            </div>
            
            <div class="modal-charity-description">
                ${charity.description}
            </div>
            
            ${charity.additionalInfo ? `
                <div class="modal-additional-info">
                    <h3>More Information</h3>
                    <p>${charity.additionalInfo}</p>
                </div>
            ` : ''}
            
            <div class="modal-charity-meta">
                <div class="modal-meta-item">
                    <div class="modal-meta-label">Focus Area</div>
                    <div class="modal-meta-value">${charity.focus}</div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-label">Location</div>
                    <div class="modal-meta-value">${charity.location}</div>
                </div>
            </div>
            
            <div class="modal-charity-actions">
                <button class="btn btn-primary" onclick="charityManager.visitWebsite('${charity.website}')">
                    Visit Website
                </button>
            </div>
        `;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('charity-modal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
updateNextRecipient() {
    const card = document.getElementById('next-donation-card');
    
    // Choose which charity to highlight (change the ID number)
    const nextCharity = this.charities.find(charity => charity.id === 5); // Change this number
    
    if (nextCharity) {
        card.classList.add('active');
        card.style.cursor = 'pointer'; // Make it look clickable
        card.innerHTML = `
            <div class="next-badge">NEXT RECIPIENT</div>
            <div class="next-charity-image">
                ${nextCharity.image ? 
                    `<img src="${nextCharity.image}" alt="${nextCharity.name}">` :
                    `<div class="charity-image-placeholder">🌳</div>`
                }
            </div>
            <div class="charity-info">
                <h3>${nextCharity.name}</h3>
                <p>${nextCharity.description}</p>
                <div class="charity-meta">
                    <div class="meta-item">
                        <span class="meta-label">Location</span>
                        <span class="meta-value">${nextCharity.location}</span>
                    </div>
                </div>
                <div class="click-hint">Click to learn more</div>
            </div>
        `;
        
        // Add click event listener
        card.onclick = () => {
            this.openCharityModal(nextCharity.id);
        };
    }
}
    
    updateStats() {
        // Update display with current stats
        this.animateCounter('total-donated', this.totalDonated, '$');
        this.animateCounter('trees-funded', this.treesFunded);
        this.animateCounter('active-partners', this.charities.length);
    }
    
    animateCounter(elementId, target, prefix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        let current = 0;
        const increment = Math.ceil(target / 100);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let displayValue = current.toLocaleString();
            if (prefix) displayValue = prefix + displayValue;
            element.textContent = displayValue;
        }, 20);
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(127, 176, 105, 0.9)' : 
                        type === 'error' ? 'rgba(220, 53, 69, 0.9)' : 
                        'rgba(255, 255, 255, 0.9)'};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
}
// Add to charities.js
document.querySelectorAll('.charity-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            translateY(-20px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(1.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
    });
});

// Initialize the charity manager
const charityManager = new CharityManager();

// Add CSS animations and modal functionality
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .charity-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .empty-state {
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 24px;
        border: 2px dashed rgba(255, 255, 255, 0.2);
    }
    
    .empty-state h3 {
        font-size: 24px;
        color: white;
        margin-bottom: 12px;
    }
    
    .empty-state p {
        color: rgba(255, 255, 255, 0.6);
    }
    
    .notification button {
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
    }
    
    .notification button:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 15, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 15, 10, 0.9)';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        charityManager.closeModal();
    }
});

// Prevent modal content clicks from closing modal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-content') || e.target.closest('.modal-content')) {
        e.stopPropagation();
    }
});
