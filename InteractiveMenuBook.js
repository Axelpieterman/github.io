class InteractiveMenuBook {
    constructor(containerId, content) {
        this.containerId = containerId;
        this.content = content;
        this.currentSpread = 0;
        this.startX = 0;
        this.isDragging = false;
        this.isFirstTurn = true;
        this.dragDistance = 0;

        this.init();
    }

    init() {
        this.createStyles();
        this.createBook();
        this.updateSpreads();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #${this.containerId} {
                width: 1000px;
                height: 750px;
                position: relative;
                perspective: 2000px;
                overflow: hidden;
            }
            .book {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translateX(-50%) rotateX(10deg);
                transform-style: preserve-3d;
                transition: transform 0.5s;
                pointer-events: none;
            }
            .page {
                position: absolute;
                width: 50%;
                height: 100%;
                top: 0;
                right: 0;
                transform-origin: left center;
                transition: transform 0.5s;
                transform-style: preserve-3d;
                background-color: #f4e1c1;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
            .page-content {
                position: absolute;
                width: 100%;
                height: 100%;
                padding: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                font-size: 18px;
                backface-visibility: hidden;
                user-select: none;
                background-color: #f4e1c1;
                background-image: 
                    linear-gradient(90deg, rgba(0,0,0,0.03) 50%, transparent 50%),
                    linear-gradient(rgba(0,0,0,0.03) 50%, transparent 50%);
                background-size: 4px 4px;
                box-shadow: inset 0 0 30px rgba(0,0,0,0.1), 
                            inset 0 0 60px rgba(0,0,0,0.05);
                pointer-events: none;
            }
            .page-back {
                transform: rotateY(180deg);
            }
            .cover {
                background-color: #f4e1c1;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .cover img {
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
            }
            .menu-title {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
            }
            .menu-item {
                display: flex;
                justify-content: space-between;
                width: 100%;
                margin-bottom: 10px;
            }
            .drag-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                z-index: 1000;
                cursor: grab;
                pointer-events: auto;
            }
            .drag-overlay:active {
                cursor: grabbing;
            }
            .spread {
                position: absolute;
                width: 100%;
                height: 100%;
                transform-style: preserve-3d;
                transition: transform 0.5s;
            }
            .left-page, .right-page {
                position: absolute;
                width: 50%;
                height: 100%;
                top: 0;
                background-color: #f4e1c1;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
            }
            .left-page {
                left: 0;
                transform-origin: right center;
            }
            .right-page {
                right: 0;
                transform-origin: left center;
            }
            .transparent-page {
                background-color: transparent;
                box-shadow: none;
            }
        `;
        document.head.appendChild(style);
    }

    createBook() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('Container element not found');
            return;
        }
        container.innerHTML = '';

        const book = document.createElement('div');
        book.className = 'book';
        book.id = 'book';

        // Create front cover (right side only)
        const frontCover = this.createSpread(null, this.content[0], true);
        book.appendChild(frontCover);

        // Create content spreads
        for (let i = 1; i < this.content.length - 1; i += 2) {
            const spread = this.createSpread(this.content[i], this.content[i + 1]);
            book.appendChild(spread);
        }

        // Create back cover (left side only)
        const backCover = this.createSpread(this.content[this.content.length - 1], null, true);
        book.appendChild(backCover);

        container.appendChild(book);

        const dragOverlay = document.createElement('div');
        dragOverlay.className = 'drag-overlay';
        container.appendChild(dragOverlay);

        this.addEventListeners(dragOverlay);
    }

    createSpread(leftContent, rightContent, isCover = false) {
        const spread = document.createElement('div');
        spread.className = 'spread';

        const leftPage = document.createElement('div');
        leftPage.className = 'page left-page';
        if (isCover && !leftContent) {
            leftPage.classList.add('transparent-page');
        } else if (leftContent) {
            this.createPageContent(leftPage, leftContent, isCover);
        }
        spread.appendChild(leftPage);

        const rightPage = document.createElement('div');
        rightPage.className = 'page right-page';
        if (isCover && !rightContent) {
            rightPage.classList.add('transparent-page');
        } else if (rightContent) {
            this.createPageContent(rightPage, rightContent, isCover);
        }
        spread.appendChild(rightPage);

        return spread;
    }

    createPageContent(element, pageContent, isCover) {
        const content = document.createElement('div');
        content.className = 'page-content';
        
        if (isCover) {
            content.classList.add('cover');
            const coverImage = document.createElement('img');
            coverImage.src = 'logo-ritz.png';
            coverImage.alt = 'Menu Cover';
            content.appendChild(coverImage);
        } else if (pageContent && pageContent.title !== "") {
            const title = document.createElement('div');
            title.className = 'menu-title';
            title.textContent = pageContent.title;
            content.appendChild(title);

            pageContent.items.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `<span>${item.name}</span><span>${item.price}</span>`;
                content.appendChild(menuItem);
            });
        }

        element.appendChild(content);
    }

    updateSpreads() {
        const book = document.getElementById('book');
        if (!book) return;

        const spreads = book.querySelectorAll('.spread');

        spreads.forEach((spread, index) => {
            if (index < this.currentSpread) {
                spread.style.transform = 'rotateY(-180deg)';
                spread.style.zIndex = index + 1;
            } else if (index === this.currentSpread) {
                spread.style.transform = 'rotateY(0deg)';
                spread.style.zIndex = spreads.length;
            } else {
                spread.style.transform = 'rotateY(0deg)';
                spread.style.zIndex = spreads.length - index;
            }
        });

        console.log(`Current spread: ${this.currentSpread}`);
    }

    // Update drag methods to work with spreads
    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = this.startX - currentX;
        const maxSpread = Math.ceil(this.content.length / 2);
        
        this.dragDistance += diff;
        
        if (this.isFirstTurn) {
            if (Math.abs(this.dragDistance) > 50) {
                if (this.dragDistance > 0 && this.currentSpread < maxSpread - 1) {
                    this.currentSpread++;
                } else if (this.dragDistance < 0 && this.currentSpread > 0) {
                    this.currentSpread--;
                }
                this.isFirstTurn = false;
                this.dragDistance = 0;
            }
        } else {
            const spreadsToTurn = Math.floor(Math.abs(this.dragDistance) / 150);
            if (spreadsToTurn > 0) {
                if (this.dragDistance > 0) {
                    this.currentSpread = Math.min(this.currentSpread + spreadsToTurn, maxSpread - 1);
                } else {
                    this.currentSpread = Math.max(this.currentSpread - spreadsToTurn, 0);
                }
                this.dragDistance = this.dragDistance % 150;
            }
        }
        
        this.startX = currentX;
        this.updateSpreads();
    }

    startDrag(e) {
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        this.dragDistance = 0;
    }

    endDrag(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.isFirstTurn = true;
        this.dragDistance = 0;
        this.updateSpreads();
    }

    easeOutQuad(t) {
        return t * (2 - t);
    }

    addEventListeners(dragOverlay) {
        dragOverlay.addEventListener('mousedown', this.startDrag.bind(this));
        dragOverlay.addEventListener('mousemove', this.drag.bind(this));
        dragOverlay.addEventListener('mouseup', this.endDrag.bind(this));
        dragOverlay.addEventListener('mouseleave', this.endDrag.bind(this));

        dragOverlay.addEventListener('touchstart', this.startDrag.bind(this));
        dragOverlay.addEventListener('touchmove', this.drag.bind(this));
        dragOverlay.addEventListener('touchend', this.endDrag.bind(this));
    }
}