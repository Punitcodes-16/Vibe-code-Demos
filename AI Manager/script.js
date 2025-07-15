// Text Input Data Type
class TextInput {
    constructor(text) {
        this.id = Date.now() + Math.random().toString(36).substr(2, 9);
        this.text = text;
        this.createdAt = new Date().toISOString();
    }
}

// Task Data Type
class Task {
    constructor(name, description, dueDate, priority, assignedTo, status, reminder, recurring, notes) {
        this.id = Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.assignedTo = assignedTo;
        this.status = status;
        this.reminder = reminder;
        this.recurring = recurring;
        this.notes = notes;
        this.createdAt = new Date().toISOString();
        this.completedAt = null;
    }

    // Get formatted due date
    getFormattedDueDate() {
        if (!this.dueDate) return 'No due date';
        const date = new Date(this.dueDate);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // Get formatted reminder
    getFormattedReminder() {
        if (!this.reminder || this.reminder === 'none') return 'No reminder';
        return this.reminder;
    }

    // Check if task is overdue
    isOverdue() {
        if (!this.dueDate || this.status === 'completed') return false;
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        return dueDate < today;
    }

    // Check if task is due soon (within 24 hours)
    isDueSoon() {
        if (!this.dueDate || this.status === 'completed') return false;
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        const diffTime = dueDate - today;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 1 && diffDays >= 0;
    }

    // Mark as completed
    markCompleted() {
        this.status = 'completed';
        this.completedAt = new Date().toISOString();
    }

    // Get priority color
    getPriorityColor() {
        const colors = {
            low: '#10b981',
            medium: '#f59e0b',
            high: '#ef4444',
            urgent: '#8b5cf6'
        };
        return colors[this.priority] || '#f59e0b';
    }

    // Get status color
    getStatusColor() {
        const colors = {
            pending: '#f59e0b',
            'in-progress': '#3b82f6',
            completed: '#10b981',
            'on-hold': '#6b7280'
        };
        return colors[this.status] || '#f59e0b';
    }
}

// Action Data Type
class Action {
    constructor(taskName, dueDate, reminder, type = 'task') {
        this.id = Date.now() + Math.random().toString(36).substr(2, 9);
        this.taskName = taskName;
        this.dueDate = dueDate;
        this.reminder = reminder;
        this.type = type; // 'task' or 'reminder'
        this.status = 'pending'; // 'pending' or 'completed'
        this.createdAt = new Date().toISOString();
    }

    // Get formatted due date
    getFormattedDueDate() {
        if (!this.dueDate) return 'No due date';
        const date = new Date(this.dueDate);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    // Get formatted reminder
    getFormattedReminder() {
        if (!this.reminder) return 'No reminder set';
        return this.reminder;
    }

    // Check if action is overdue
    isOverdue() {
        if (!this.dueDate || this.status === 'completed') return false;
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        return dueDate < today;
    }

    // Check if action is due soon (within 24 hours)
    isDueSoon() {
        if (!this.dueDate || this.status === 'completed') return false;
        const today = new Date();
        const dueDate = new Date(this.dueDate);
        const diffTime = dueDate - today;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return diffDays <= 1 && diffDays >= 0;
    }
}

// Calendar Event Data Type
class CalendarEvent {
    constructor(name, date, time, description, type) {
        this.id = Date.now() + Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.date = date;
        this.time = time;
        this.description = description;
        this.type = type;
        this.createdAt = new Date().toISOString();
    }

    // Get formatted date
    getFormattedDate() {
        const date = new Date(this.date);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    // Get formatted time
    getFormattedTime() {
        return this.time;
    }

    // Get full date time
    getFullDateTime() {
        return new Date(`${this.date}T${this.time}`);
    }
}

// User Profile Data Type
class UserProfile {
    constructor() {
        this.name = '';
        this.email = '';
        this.bio = '';
        this.avatar = '';
        this.preferences = {
            emailNotifications: false,
            pushNotifications: false,
            aiSuggestions: false,
            analytics: false
        };
        this.settings = {
            profileVisibility: 'public',
            dataSharing: 'standard',
            theme: 'light',
            language: 'en',
            timezone: 'UTC',
            aiModel: 'gpt-4',
            responseLength: 'medium'
        };
        this.events = [];
        this.textInputs = [];
        this.actions = [];
        this.tasks = [];
    }

    // Save profile to localStorage
    save() {
        localStorage.setItem('userProfile', JSON.stringify(this));
    }

    // Load profile from localStorage
    load() {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(this, data);
        }
    }

    // Update profile data
    update(data) {
        Object.assign(this, data);
        this.save();
    }

    // Add event
    addEvent(event) {
        this.events.push(event);
        this.save();
    }

    // Remove event
    removeEvent(eventId) {
        this.events = this.events.filter(event => event.id !== eventId);
        this.save();
    }

    // Get events for a specific date
    getEventsForDate(date) {
        return this.events.filter(event => event.date === date);
    }

    // Get upcoming events
    getUpcomingEvents(limit = 5) {
        const today = new Date().toISOString().split('T')[0];
        return this.events
            .filter(event => event.date >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, limit);
    }

    // Add text input
    addTextInput(textInput) {
        this.textInputs.push(textInput);
        this.save();
    }

    // Add action
    addAction(action) {
        this.actions.push(action);
        this.save();
    }

    // Remove action
    removeAction(actionId) {
        this.actions = this.actions.filter(action => action.id !== actionId);
        this.save();
    }

    // Update action status
    updateActionStatus(actionId, status) {
        const action = this.actions.find(a => a.id === actionId);
        if (action) {
            action.status = status;
            this.save();
        }
    }

    // Get tasks
    getTasks() {
        return this.actions.filter(action => action.type === 'task');
    }

    // Get reminders
    getReminders() {
        return this.actions.filter(action => action.type === 'reminder');
    }

    // Get overdue actions
    getOverdueActions() {
        return this.actions.filter(action => action.isOverdue());
    }

    // Get actions due soon
    getActionsDueSoon() {
        return this.actions.filter(action => action.isDueSoon());
    }

    // Add task
    addTask(task) {
        this.tasks.push(task);
        this.save();
    }

    // Remove task
    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.save();
    }

    // Update task
    updateTask(taskId, updates) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
            this.save();
        }
    }

    // Get tasks by status
    getTasksByStatus(status) {
        return this.tasks.filter(task => task.status === status);
    }

    // Get tasks by priority
    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    // Get tasks by assigned user
    getTasksByAssignedTo(assignedTo) {
        return this.tasks.filter(task => task.assignedTo === assignedTo);
    }

    // Get overdue tasks
    getOverdueTasks() {
        return this.tasks.filter(task => task.isOverdue());
    }

    // Get tasks due soon
    getTasksDueSoon() {
        return this.tasks.filter(task => task.isDueSoon());
    }

    // Search tasks
    searchTasks(query) {
        const lowerQuery = query.toLowerCase();
        return this.tasks.filter(task => 
            task.name.toLowerCase().includes(lowerQuery) ||
            task.description.toLowerCase().includes(lowerQuery) ||
            task.assignedTo.toLowerCase().includes(lowerQuery)
        );
    }
}

// Notification System
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notificationContainer');
    }

    show(type, title, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        notification.innerHTML = `
            <i class="notification-icon ${icons[type]}"></i>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
            <i class="notification-close fas fa-times"></i>
        `;

        this.container.appendChild(notification);

        // Auto remove after duration
        setTimeout(() => {
            this.remove(notification);
        }, duration);

        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.remove(notification);
        });

        return notification;
    }

    remove(notification) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    success(title, message, duration) {
        return this.show('success', title, message, duration);
    }

    error(title, message, duration) {
        return this.show('error', title, message, duration);
    }

    warning(title, message, duration) {
        return this.show('warning', title, message, duration);
    }

    info(title, message, duration) {
        return this.show('info', title, message, duration);
    }
}

// Theme Manager
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeButtons();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.theme === theme) {
                btn.classList.add('active');
            }
        });
    }

    setupThemeButtons() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.theme;
                this.applyTheme(theme);
                
                // Update user profile
                if (window.userProfile) {
                    window.userProfile.settings.theme = theme;
                    window.userProfile.save();
                }
            });
        });
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupNavigationLinks();
        this.showPage(this.currentPage);
    }

    setupNavigationLinks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.navigateTo(page);
            });
        });
    }

    navigateTo(page) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Show page
        this.showPage(page);
        this.currentPage = page;
    }

    showPage(page) {
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });
        document.getElementById(page).classList.add('active');
    }
}

// Profile Manager
class ProfileManager {
    constructor(userProfile) {
        this.userProfile = userProfile;
        this.init();
    }

    init() {
        this.loadProfileData();
        this.setupEventListeners();
        this.updateUI();
    }

    loadProfileData() {
        // Load saved profile data
        this.userProfile.load();
        
        // Populate form fields
        document.getElementById('nameInput').value = this.userProfile.name || '';
        document.getElementById('emailInput').value = this.userProfile.email || '';
        document.getElementById('bioInput').value = this.userProfile.bio || '';
        
        // Set preferences
        document.getElementById('emailNotifications').checked = this.userProfile.preferences.emailNotifications;
        document.getElementById('pushNotifications').checked = this.userProfile.preferences.pushNotifications;
        document.getElementById('aiSuggestions').checked = this.userProfile.preferences.aiSuggestions;
        document.getElementById('analytics').checked = this.userProfile.preferences.analytics;
        
        // Set privacy settings
        document.getElementById('profileVisibility').value = this.userProfile.settings.profileVisibility;
        document.getElementById('dataSharing').value = this.userProfile.settings.dataSharing;
        
        // Set theme
        if (window.themeManager) {
            window.themeManager.applyTheme(this.userProfile.settings.theme);
        }
    }

    setupEventListeners() {
        // Save profile button
        document.getElementById('saveProfile').addEventListener('click', () => {
            this.saveProfile();
        });

        // Reset profile button
        document.getElementById('resetProfile').addEventListener('click', () => {
            this.resetProfile();
        });

        // Avatar upload
        document.getElementById('avatarUpload').addEventListener('change', (e) => {
            this.handleAvatarUpload(e);
        });

        // Settings form fields
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.userProfile.settings.language = e.target.value;
            this.userProfile.save();
        });

        document.getElementById('timezoneSelect').addEventListener('change', (e) => {
            this.userProfile.settings.timezone = e.target.value;
            this.userProfile.save();
        });

        document.getElementById('aiModel').addEventListener('change', (e) => {
            this.userProfile.settings.aiModel = e.target.value;
            this.userProfile.save();
        });

        document.getElementById('responseLength').addEventListener('change', (e) => {
            this.userProfile.settings.responseLength = e.target.value;
            this.userProfile.save();
        });
    }

    saveProfile() {
        // Validate form
        const name = document.getElementById('nameInput').value.trim();
        const email = document.getElementById('emailInput').value.trim();
        
        if (!name) {
            window.notifications.error('Validation Error', 'Please enter your full name.');
            return;
        }

        if (!email || !this.isValidEmail(email)) {
            window.notifications.error('Validation Error', 'Please enter a valid email address.');
            return;
        }

        // Collect form data
        const profileData = {
            name: name,
            email: email,
            bio: document.getElementById('bioInput').value.trim(),
            preferences: {
                emailNotifications: document.getElementById('emailNotifications').checked,
                pushNotifications: document.getElementById('pushNotifications').checked,
                aiSuggestions: document.getElementById('aiSuggestions').checked,
                analytics: document.getElementById('analytics').checked
            },
            settings: {
                ...this.userProfile.settings,
                profileVisibility: document.getElementById('profileVisibility').value,
                dataSharing: document.getElementById('dataSharing').value
            }
        };

        // Update profile
        this.userProfile.update(profileData);
        
        // Update UI
        this.updateUI();
        
        // Show success message
        window.notifications.success(
            'Profile Updated', 
            'Your profile has been successfully updated.',
            3000
        );
    }

    resetProfile() {
        if (confirm('Are you sure you want to reset your profile? This will clear all your changes.')) {
            this.loadProfileData();
            window.notifications.info('Profile Reset', 'Your profile has been reset to the last saved state.');
        }
    }

    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            window.notifications.error('Invalid File', 'Please select an image file.');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            window.notifications.error('File Too Large', 'Please select an image smaller than 5MB.');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target.result;
            
            // Update avatar images
            document.getElementById('profileAvatar').src = imageUrl;
            document.getElementById('avatarImg').src = imageUrl;
            
            // Save to profile
            this.userProfile.avatar = imageUrl;
            this.userProfile.save();
            
            window.notifications.success('Avatar Updated', 'Your profile picture has been updated.');
        };
        reader.readAsDataURL(file);
    }

    updateUI() {
        // Update navigation user info
        document.getElementById('userName').textContent = this.userProfile.name || 'John Doe';
        document.getElementById('profileName').textContent = this.userProfile.name || 'John Doe';
        document.getElementById('profileEmail').textContent = this.userProfile.email || 'john.doe@example.com';
        
        // Update avatar if exists
        if (this.userProfile.avatar) {
            document.getElementById('profileAvatar').src = this.userProfile.avatar;
            document.getElementById('avatarImg').src = this.userProfile.avatar;
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Calendar Manager
class CalendarManager {
    constructor(userProfile) {
        this.userProfile = userProfile;
        this.currentDate = new Date();
        this.selectedDate = new Date();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderCalendar();
        this.updateUpcomingEvents();
    }

    setupEventListeners() {
        // Navigation buttons
        document.getElementById('prevMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendar();
        });

        // Add event button
        document.getElementById('addEventBtn').addEventListener('click', () => {
            this.openEventModal();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeEventModal();
        });

        document.getElementById('cancelEvent').addEventListener('click', () => {
            this.closeEventModal();
        });

        // Form submission
        document.getElementById('eventForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEvent();
        });

        // Close modal on overlay click
        document.getElementById('eventModal').addEventListener('click', (e) => {
            if (e.target.id === 'eventModal') {
                this.closeEventModal();
            }
        });
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];
        document.getElementById('currentMonth').textContent = `${monthNames[month]} ${year}`;

        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDay = firstDay.getDay();

        // Clear calendar grid
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDay; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarGrid.appendChild(emptyDay);
        }

        // Add days of the month
        const today = new Date().toISOString().split('T')[0];
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const eventsForDay = this.userProfile.getEventsForDate(dateString);
            
            if (dateString === today) {
                dayElement.classList.add('today');
            }
            
            if (eventsForDay.length > 0) {
                dayElement.classList.add('has-event');
            }

            dayElement.innerHTML = `
                <div class="calendar-day-number">${day}</div>
                <div class="calendar-day-events">
                    ${eventsForDay.slice(0, 2).map(event => 
                        `<div class="calendar-day-event">${event.name}</div>`
                    ).join('')}
                    ${eventsForDay.length > 2 ? `<div class="calendar-day-event">+${eventsForDay.length - 2} more</div>` : ''}
                </div>
            `;

            // Add click event to view events for this day
            dayElement.addEventListener('click', () => {
                this.selectDate(dateString);
            });

            calendarGrid.appendChild(dayElement);
        }

        // Update event count
        const eventCount = this.userProfile.events.filter(event => {
            const eventMonth = new Date(event.date).getMonth();
            const eventYear = new Date(event.date).getFullYear();
            return eventMonth === month && eventYear === year;
        }).length;
        
        document.getElementById('eventCount').textContent = `${eventCount} event${eventCount !== 1 ? 's' : ''} this month`;
    }

    selectDate(dateString) {
        this.selectedDate = new Date(dateString);
        const eventsForDay = this.userProfile.getEventsForDate(dateString);
        
        if (eventsForDay.length > 0) {
            // Show events for this day
            this.showDayEvents(dateString, eventsForDay);
        } else {
            // Open add event modal for this date
            this.openEventModal(dateString);
        }
    }

    showDayEvents(dateString, events) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        let eventsHtml = '';
        events.forEach(event => {
            eventsHtml += `
                <div class="event-item">
                    <div class="event-title">${event.name}</div>
                    <div class="event-date">${event.getFormattedTime()}</div>
                    ${event.description ? `<div class="event-description">${event.description}</div>` : ''}
                    <span class="event-type ${event.type}">${event.type}</span>
                </div>
            `;
        });

        // You could show this in a modal or update the sidebar
        window.notifications.info('Events for ' + formattedDate, `${events.length} event${events.length !== 1 ? 's' : ''} found`);
    }

    openEventModal(dateString = null) {
        const modal = document.getElementById('eventModal');
        const form = document.getElementById('eventForm');
        
        // Reset form
        form.reset();
        
        // Set default date if provided
        if (dateString) {
            document.getElementById('eventDate').value = dateString;
        } else {
            document.getElementById('eventDate').value = new Date().toISOString().split('T')[0];
        }
        
        // Set default time to current time + 1 hour
        const now = new Date();
        now.setHours(now.getHours() + 1);
        document.getElementById('eventTime').value = now.toTimeString().slice(0, 5);
        
        // Show modal
        modal.classList.add('active');
        document.getElementById('eventName').focus();
    }

    closeEventModal() {
        const modal = document.getElementById('eventModal');
        modal.classList.remove('active');
    }

    saveEvent() {
        const name = document.getElementById('eventName').value.trim();
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const description = document.getElementById('eventDescription').value.trim();
        const type = document.getElementById('eventType').value;

        // Validate form
        if (!name) {
            window.notifications.error('Validation Error', 'Please enter an event name.');
            return;
        }

        if (!date) {
            window.notifications.error('Validation Error', 'Please select an event date.');
            return;
        }

        if (!time) {
            window.notifications.error('Validation Error', 'Please select an event time.');
            return;
        }

        // Create new event
        const event = new CalendarEvent(name, date, time, description, type);
        
        // Add to user profile
        this.userProfile.addEvent(event);
        
        // Close modal
        this.closeEventModal();
        
        // Update calendar
        this.renderCalendar();
        this.updateUpcomingEvents();
        
        // Show success message
        window.notifications.success(
            'Event Added', 
            `"${event.name}" has been added to your calendar.`,
            3000
        );
    }

    updateUpcomingEvents() {
        const upcomingEvents = this.userProfile.getUpcomingEvents(5);
        const eventsList = document.getElementById('upcomingEventsList');
        
        if (upcomingEvents.length === 0) {
            eventsList.innerHTML = '<p style="color: var(--text-muted); font-size: 0.875rem;">No upcoming events</p>';
            return;
        }

        eventsList.innerHTML = upcomingEvents.map(event => `
            <div class="event-item" onclick="window.calendarManager.selectDate('${event.date}')">
                <div class="event-title">${event.name}</div>
                <div class="event-date">${event.getFormattedDate()} at ${event.getFormattedTime()}</div>
                <span class="event-type ${event.type}">${event.type}</span>
            </div>
        `).join('');
    }
}

// Text-to-Action Manager
class TextToActionManager {
    constructor(userProfile) {
        this.userProfile = userProfile;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderActions();
    }

    setupEventListeners() {
        // Convert button
        document.getElementById('convertBtn').addEventListener('click', () => {
            this.convertTextToActions();
        });

        // Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            this.clearInput();
        });

        // Example items
        document.querySelectorAll('.example-item').forEach(item => {
            item.addEventListener('click', () => {
                const example = item.dataset.example;
                document.getElementById('textInput').value = example;
            });
        });

        // Tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
            });
        });
    }

    convertTextToActions() {
        const text = document.getElementById('textInput').value.trim();
        
        if (!text) {
            window.notifications.error('Validation Error', 'Please enter some text to convert.');
            return;
        }

        // Save text input
        const textInput = new TextInput(text);
        this.userProfile.addTextInput(textInput);

        // Parse text and create actions
        const actions = this.parseTextToActions(text);
        
        // Add actions to user profile
        actions.forEach(action => {
            this.userProfile.addAction(action);
        });

        // Clear input
        this.clearInput();

        // Update display
        this.renderActions();

        // Show success message
        window.notifications.success(
            'Text Converted', 
            `Successfully converted text into ${actions.length} action${actions.length !== 1 ? 's' : ''}.`,
            3000
        );
    }

    parseTextToActions(text) {
        const actions = [];
        const sentences = text.split(/[.!?]+/).filter(s => s.trim());
        
        sentences.forEach(sentence => {
            const trimmedSentence = sentence.trim();
            if (!trimmedSentence) return;

            // Extract date/time information
            const dateInfo = this.extractDateInfo(trimmedSentence);
            const timeInfo = this.extractTimeInfo(trimmedSentence);
            
            // Determine if it's a task or reminder
            const isReminder = this.isReminderText(trimmedSentence);
            const type = isReminder ? 'reminder' : 'task';
            
            // Create action name (remove date/time words)
            let actionName = this.cleanActionName(trimmedSentence, dateInfo, timeInfo);
            
            // Create action
            const action = new Action(
                actionName,
                dateInfo.date,
                timeInfo.time || dateInfo.reminder,
                type
            );
            
            actions.push(action);
        });

        return actions;
    }

    extractDateInfo(text) {
        const lowerText = text.toLowerCase();
        const today = new Date();
        
        // Tomorrow
        if (lowerText.includes('tomorrow')) {
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return {
                date: tomorrow.toISOString().split('T')[0],
                reminder: 'tomorrow'
            };
        }
        
        // Next week
        if (lowerText.includes('next week')) {
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);
            return {
                date: nextWeek.toISOString().split('T')[0],
                reminder: 'next week'
            };
        }
        
        // Next month
        if (lowerText.includes('next month')) {
            const nextMonth = new Date(today);
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            return {
                date: nextMonth.toISOString().split('T')[0],
                reminder: 'next month'
            };
        }
        
        // Specific days
        const dayPatterns = {
            'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4,
            'friday': 5, 'saturday': 6, 'sunday': 0
        };
        
        for (const [day, dayNum] of Object.entries(dayPatterns)) {
            if (lowerText.includes(day)) {
                const targetDate = new Date(today);
                const currentDay = targetDate.getDay();
                const daysToAdd = (dayNum - currentDay + 7) % 7;
                targetDate.setDate(targetDate.getDate() + daysToAdd);
                return {
                    date: targetDate.toISOString().split('T')[0],
                    reminder: day
                };
            }
        }
        
        // No specific date found
        return { date: null, reminder: null };
    }

    extractTimeInfo(text) {
        const lowerText = text.toLowerCase();
        
        // Time patterns (e.g., "2pm", "14:00", "2:30pm")
        const timePattern = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i;
        const match = text.match(timePattern);
        
        if (match) {
            let hours = parseInt(match[1]);
            const minutes = match[2] ? parseInt(match[2]) : 0;
            const period = match[3] ? match[3].toLowerCase() : '';
            
            // Convert to 24-hour format
            if (period === 'pm' && hours !== 12) {
                hours += 12;
            } else if (period === 'am' && hours === 12) {
                hours = 0;
            }
            
            return {
                time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
            };
        }
        
        return { time: null };
    }

    isReminderText(text) {
        const lowerText = text.toLowerCase();
        const reminderKeywords = ['remember', 'remind', 'don\'t forget', 'make sure', 'ensure'];
        return reminderKeywords.some(keyword => lowerText.includes(keyword));
    }

    cleanActionName(text, dateInfo, timeInfo) {
        let cleaned = text;
        
        // Remove date-related words
        const dateWords = ['tomorrow', 'next week', 'next month', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        dateWords.forEach(word => {
            cleaned = cleaned.replace(new RegExp(word, 'gi'), '');
        });
        
        // Remove time-related words
        const timePattern = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/gi;
        cleaned = cleaned.replace(timePattern, '');
        
        // Remove reminder keywords
        const reminderWords = ['remember to', 'remind me to', 'don\'t forget to', 'make sure to', 'ensure to'];
        reminderWords.forEach(word => {
            cleaned = cleaned.replace(new RegExp(word, 'gi'), '');
        });
        
        // Clean up extra spaces and punctuation
        cleaned = cleaned.replace(/\s+/g, ' ').trim();
        cleaned = cleaned.replace(/^[,\s]+|[,\s]+$/g, '');
        
        return cleaned || 'Untitled task';
    }

    clearInput() {
        document.getElementById('textInput').value = '';
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');

        // Render appropriate content
        this.renderActions();
    }

    renderActions() {
        const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
        
        if (activeTab === 'tasks') {
            this.renderTasks();
        } else {
            this.renderReminders();
        }
    }

    renderTasks() {
        const tasks = this.userProfile.getTasks();
        const tasksList = document.getElementById('tasksList');
        
        if (tasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-tasks"></i>
                    <p>No tasks converted yet. Enter some text and click "Convert to Actions" to get started.</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = tasks.map(task => this.createActionHTML(task)).join('');
        this.setupActionEventListeners('tasks');
    }

    renderReminders() {
        const reminders = this.userProfile.getReminders();
        const remindersList = document.getElementById('remindersList');
        
        if (reminders.length === 0) {
            remindersList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell"></i>
                    <p>No reminders converted yet. Enter some text and click "Convert to Actions" to get started.</p>
                </div>
            `;
            return;
        }

        remindersList.innerHTML = reminders.map(reminder => this.createActionHTML(reminder)).join('');
        this.setupActionEventListeners('reminders');
    }

    createActionHTML(action) {
        const statusClass = action.status === 'completed' ? 'completed' : 'pending';
        const overdueClass = action.isOverdue() ? 'overdue' : '';
        const dueSoonClass = action.isDueSoon() ? 'due-soon' : '';
        
        return `
            <div class="action-item ${overdueClass} ${dueSoonClass}" data-action-id="${action.id}">
                <div class="action-header">
                    <div class="action-title">${action.taskName}</div>
                    <div class="action-actions">
                        <button class="action-btn complete" onclick="window.textToActionManager.completeAction('${action.id}')" title="Mark as complete">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="action-btn delete" onclick="window.textToActionManager.deleteAction('${action.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="action-details">
                    <div class="action-detail">
                        <i class="fas fa-calendar"></i>
                        <span class="action-due-date">${action.getFormattedDueDate()}</span>
                    </div>
                    <div class="action-detail">
                        <i class="fas fa-bell"></i>
                        <span class="action-reminder">${action.getFormattedReminder()}</span>
                    </div>
                </div>
                <span class="action-status ${statusClass}">${action.status}</span>
            </div>
        `;
    }

    setupActionEventListeners(type) {
        // Event listeners are handled inline for simplicity
    }

    completeAction(actionId) {
        this.userProfile.updateActionStatus(actionId, 'completed');
        this.renderActions();
        window.notifications.success('Action Completed', 'Task marked as completed.');
    }

    deleteAction(actionId) {
        if (confirm('Are you sure you want to delete this action?')) {
            this.userProfile.removeAction(actionId);
            this.renderActions();
            window.notifications.success('Action Deleted', 'Action has been removed.');
        }
    }

    // Check for overdue and due soon actions
    checkActionNotifications() {
        const overdueActions = this.userProfile.getOverdueActions();
        const dueSoonActions = this.userProfile.getActionsDueSoon();

        overdueActions.forEach(action => {
            window.notifications.warning(
                'Overdue Action',
                `"${action.taskName}" is overdue. Due date: ${action.getFormattedDueDate()}`,
                10000
            );
        });

        dueSoonActions.forEach(action => {
            window.notifications.info(
                'Action Due Soon',
                `"${action.taskName}" is due soon. Due date: ${action.getFormattedDueDate()}`,
                8000
            );
        });
    }
}

// Task Manager
class FileManager {
    constructor() {
        this.files = [];
        this.filters = {
            all: true,
            summarized: true,
            processing: true
        };
        this.searchTerm = '';
        this.sortBy = 'uploadDate';
        this.apiBaseUrl = 'http://localhost:3001/api';
        
        this.init();
    }

    init() {
        this.loadFiles();
        this.setupEventListeners();
        this.updateStats();
    }

    setupEventListeners() {
        // Upload button
        document.getElementById('uploadFileBtn').addEventListener('click', () => {
            this.showUploadModal();
        });

        // File modal events
        document.getElementById('closeFileModal').addEventListener('click', () => {
            this.hideUploadModal();
        });

        document.getElementById('cancelFile').addEventListener('click', () => {
            this.hideUploadModal();
        });

        // File upload area
        const uploadArea = document.getElementById('fileUploadArea');
        const fileInput = document.getElementById('fileUpload');

        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });

        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                this.handleFileSelect();
            }
        });

        fileInput.addEventListener('change', () => {
            this.handleFileSelect();
        });

        // Remove file button
        document.getElementById('removeFile').addEventListener('click', () => {
            this.clearFileSelection();
        });

        // Form submission
        document.getElementById('fileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.uploadFile();
        });

        // Search and filters
        document.getElementById('fileSearch').addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.renderFiles();
        });

        document.getElementById('fileSort').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderFiles();
        });

        // Filter checkboxes
        document.getElementById('filterAll').addEventListener('change', (e) => {
            this.filters.all = e.target.checked;
            this.updateFilters();
        });

        document.getElementById('filterSummarized').addEventListener('change', (e) => {
            this.filters.summarized = e.target.checked;
            this.updateFilters();
        });

        document.getElementById('filterProcessing').addEventListener('change', (e) => {
            this.filters.processing = e.target.checked;
            this.updateFilters();
        });
    }

    updateFilters() {
        this.renderFiles();
    }

    showUploadModal() {
        document.getElementById('fileModal').style.display = 'flex';
        this.clearFileSelection();
        document.getElementById('fileForm').reset();
    }

    hideUploadModal() {
        document.getElementById('fileModal').style.display = 'none';
    }

    handleFileSelect() {
        const fileInput = document.getElementById('fileUpload');
        const file = fileInput.files[0];
        
        if (file) {
            document.getElementById('fileUploadArea').style.display = 'none';
            document.getElementById('filePreview').style.display = 'block';
            document.getElementById('previewFileName').textContent = file.name;
            document.getElementById('previewFileSize').textContent = this.formatFileSize(file.size);
        }
    }

    clearFileSelection() {
        document.getElementById('fileUpload').value = '';
        document.getElementById('fileUploadArea').style.display = 'block';
        document.getElementById('filePreview').style.display = 'none';
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async uploadFile() {
        const formData = new FormData();
        const fileInput = document.getElementById('fileUpload');
        const fileName = document.getElementById('fileName').value;
        const summaryType = document.getElementById('summaryType').value;
        const notes = document.getElementById('fileNotes').value;

        if (!fileInput.files[0]) {
            notificationManager.show('Please select a file to upload', 'error');
            return;
        }

        if (!fileName.trim()) {
            notificationManager.show('Please enter a file name', 'error');
            return;
        }

        formData.append('file', fileInput.files[0]);
        formData.append('fileName', fileName);
        formData.append('summaryType', summaryType);
        formData.append('notes', notes);

        try {
            const response = await fetch(`${this.apiBaseUrl}/upload`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.files.push(result.file);
                this.renderFiles();
                this.updateStats();
                this.hideUploadModal();
                notificationManager.show('File uploaded successfully! Summarization in progress...', 'success');
                
                // Poll for status updates
                this.pollFileStatus(result.file.id);
            } else {
                notificationManager.show(result.error || 'Upload failed', 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            notificationManager.show('Upload failed. Please try again.', 'error');
        }
    }

    async pollFileStatus(fileId) {
        const maxAttempts = 30; // 30 seconds
        let attempts = 0;

        const poll = async () => {
            try {
                const response = await fetch(`${this.apiBaseUrl}/files/${fileId}`);
                const file = await response.json();

                if (file.status === 'summarized') {
                    this.updateFileInList(file);
                    this.updateStats();
                    notificationManager.show('File summarization completed!', 'success');
                } else if (file.status === 'error') {
                    this.updateFileInList(file);
                    this.updateStats();
                    notificationManager.show('Summarization failed: ' + file.error, 'error');
                } else if (attempts < maxAttempts) {
                    attempts++;
                    setTimeout(poll, 1000);
                }
            } catch (error) {
                console.error('Poll error:', error);
            }
        };

        poll();
    }

    updateFileInList(updatedFile) {
        const index = this.files.findIndex(f => f.id === updatedFile.id);
        if (index !== -1) {
            this.files[index] = updatedFile;
            this.renderFiles();
        }
    }

    async loadFiles() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/files`);
            this.files = await response.json();
            this.renderFiles();
            this.updateStats();
        } catch (error) {
            console.error('Error loading files:', error);
            notificationManager.show('Failed to load files', 'error');
        }
    }

    renderFiles() {
        const filesList = document.getElementById('filesList');
        let filteredFiles = this.filterFiles();
        filteredFiles = this.sortFiles(filteredFiles);

        if (filteredFiles.length === 0) {
            filesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <p>${this.searchTerm ? 'No files match your search.' : 'No files uploaded yet. Upload your first file to get started.'}</p>
                </div>
            `;
            return;
        }

        filesList.innerHTML = filteredFiles.map(file => this.renderFileItem(file)).join('');
    }

    filterFiles() {
        return this.files.filter(file => {
            const matchesSearch = !this.searchTerm || 
                file.fileName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                (file.summary && file.summary.toLowerCase().includes(this.searchTerm.toLowerCase()));

            const matchesFilter = 
                (this.filters.all) ||
                (this.filters.summarized && file.status === 'summarized') ||
                (this.filters.processing && file.status === 'processing');

            return matchesSearch && matchesFilter;
        });
    }

    sortFiles(files) {
        return files.sort((a, b) => {
            switch (this.sortBy) {
                case 'fileName':
                    return a.fileName.localeCompare(b.fileName);
                case 'fileSize':
                    return b.fileSize - a.fileSize;
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'uploadDate':
                default:
                    return new Date(b.uploadDate) - new Date(a.uploadDate);
            }
        });
    }

    renderFileItem(file) {
        const statusClass = file.status === 'summarized' ? 'summarized' : 
                           file.status === 'processing' ? 'processing' : 'error';
        
        const statusText = file.status === 'summarized' ? 'Summarized' : 
                          file.status === 'processing' ? 'Processing' : 'Error';

        return `
            <div class="file-item ${statusClass}">
                <div class="file-header">
                    <div>
                        <div class="file-title">${file.fileName}</div>
                        <span class="file-status ${statusClass}">${statusText}</span>
                    </div>
                    <div class="file-actions">
                        <button class="file-btn download" onclick="fileManager.downloadFile('${file.id}')" title="Download Original">
                            <i class="fas fa-download"></i>
                        </button>
                        <button class="file-btn view" onclick="fileManager.viewSummary('${file.id}')" title="View Summary">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="file-btn delete" onclick="fileManager.deleteFile('${file.id}')" title="Delete File">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <div class="file-details">
                    <div class="file-detail">
                        <i class="fas fa-file"></i>
                        <span>${file.originalName}</span>
                    </div>
                    <div class="file-detail">
                        <i class="fas fa-weight-hanging"></i>
                        <span>${this.formatFileSize(file.fileSize)}</span>
                    </div>
                    <div class="file-detail">
                        <i class="fas fa-calendar"></i>
                        <span>${new Date(file.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <div class="file-detail">
                        <i class="fas fa-cog"></i>
                        <span>${file.summaryType.charAt(0).toUpperCase() + file.summaryType.slice(1)} Summary</span>
                    </div>
                </div>
                
                ${file.summary ? `
                    <div class="file-summary">
                        <strong>Summary:</strong> ${file.summary}
                    </div>
                ` : file.status === 'processing' ? `
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 50%;"></div>
                    </div>
                ` : file.error ? `
                    <div class="file-summary" style="border-left-color: var(--error-color);">
                        <strong>Error:</strong> ${file.error}
                    </div>
                ` : ''}
                
                <div class="file-meta">
                    <span class="file-date">Uploaded ${this.formatDate(file.uploadDate)}</span>
                    ${file.notes ? `<span class="file-notes">Notes: ${file.notes}</span>` : ''}
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'today';
        if (diffDays === 2) return 'yesterday';
        if (diffDays <= 7) return `${diffDays - 1} days ago`;
        return date.toLocaleDateString();
    }

    updateStats() {
        const totalFiles = this.files.length;
        const summarizedFiles = this.files.filter(f => f.status === 'summarized').length;
        const processingFiles = this.files.filter(f => f.status === 'processing').length;

        document.getElementById('totalFiles').textContent = totalFiles;
        document.getElementById('summarizedFiles').textContent = summarizedFiles;
        document.getElementById('processingFiles').textContent = processingFiles;
    }

    async downloadFile(fileId) {
        try {
            window.open(`${this.apiBaseUrl}/files/${fileId}/download`, '_blank');
        } catch (error) {
            console.error('Download error:', error);
            notificationManager.show('Download failed', 'error');
        }
    }

    viewSummary(fileId) {
        const file = this.files.find(f => f.id === fileId);
        if (file && file.summary) {
            // Create a modal to show the full summary
            const modal = document.createElement('div');
            modal.className = 'modal-overlay';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h3>Summary: ${file.fileName}</h3>
                        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="file-summary" style="margin: 0;">
                            ${file.summary}
                        </div>
                        ${file.notes ? `
                            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                                <strong>Notes:</strong> ${file.notes}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        } else {
            notificationManager.show('No summary available', 'warning');
        }
    }

    async deleteFile(fileId) {
        if (!confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/files/${fileId}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                this.files = this.files.filter(f => f.id !== fileId);
                this.renderFiles();
                this.updateStats();
                notificationManager.show('File deleted successfully', 'success');
            } else {
                notificationManager.show(result.error || 'Delete failed', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            notificationManager.show('Delete failed', 'error');
        }
    }
}

class TaskManager {
    constructor(userProfile) {
        this.userProfile = userProfile;
        this.currentFilters = {
            pending: true,
            inProgress: true,
            completed: true,
            overdue: true
        };
        this.currentSort = 'dueDate';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    setupEventListeners() {
        // Add task button
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.openTaskModal();
        });

        // Task modal events
        document.getElementById('closeTaskModal').addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('cancelTask').addEventListener('click', () => {
            this.closeTaskModal();
        });

        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Close modal on overlay click
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target.id === 'taskModal') {
                this.closeTaskModal();
            }
        });

        // Filter checkboxes
        document.getElementById('filterPending').addEventListener('change', () => {
            this.currentFilters.pending = document.getElementById('filterPending').checked;
            this.renderTasks();
        });

        document.getElementById('filterInProgress').addEventListener('change', () => {
            this.currentFilters.inProgress = document.getElementById('filterInProgress').checked;
            this.renderTasks();
        });

        document.getElementById('filterCompleted').addEventListener('change', () => {
            this.currentFilters.completed = document.getElementById('filterCompleted').checked;
            this.renderTasks();
        });

        document.getElementById('filterOverdue').addEventListener('change', () => {
            this.currentFilters.overdue = document.getElementById('filterOverdue').checked;
            this.renderTasks();
        });

        // Search input
        document.getElementById('taskSearch').addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.renderTasks();
        });

        // Sort select
        document.getElementById('taskSort').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.renderTasks();
        });
    }

    openTaskModal(taskId = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        
        // Reset form
        form.reset();
        
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('taskDueDate').value = tomorrow.toISOString().split('T')[0];
        
        if (taskId) {
            // Edit mode
            const task = this.userProfile.tasks.find(t => t.id === taskId);
            if (task) {
                document.getElementById('taskModalTitle').textContent = 'Edit Task';
                this.populateTaskForm(task);
                modal.dataset.editTaskId = taskId;
            }
        } else {
            // Add mode
            document.getElementById('taskModalTitle').textContent = 'Add New Task';
            delete modal.dataset.editTaskId;
        }
        
        // Show modal
        modal.classList.add('active');
        document.getElementById('taskName').focus();
    }

    closeTaskModal() {
        const modal = document.getElementById('taskModal');
        modal.classList.remove('active');
    }

    populateTaskForm(task) {
        document.getElementById('taskName').value = task.name;
        document.getElementById('taskDescription').value = task.description || '';
        document.getElementById('taskDueDate').value = task.dueDate;
        document.getElementById('taskPriority').value = task.priority;
        document.getElementById('taskAssignedTo').value = task.assignedTo;
        document.getElementById('taskStatus').value = task.status;
        document.getElementById('taskReminder').value = task.reminder;
        document.getElementById('taskRecurring').value = task.recurring;
        document.getElementById('taskNotes').value = task.notes || '';
    }

    saveTask() {
        const name = document.getElementById('taskName').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;
        const assignedTo = document.getElementById('taskAssignedTo').value;
        const status = document.getElementById('taskStatus').value;
        const reminder = document.getElementById('taskReminder').value;
        const recurring = document.getElementById('taskRecurring').value;
        const notes = document.getElementById('taskNotes').value.trim();

        // Validate form
        if (!name) {
            window.notifications.error('Validation Error', 'Please enter a task name.');
            return;
        }

        if (!dueDate) {
            window.notifications.error('Validation Error', 'Please select a due date.');
            return;
        }

        const modal = document.getElementById('taskModal');
        const editTaskId = modal.dataset.editTaskId;

        if (editTaskId) {
            // Update existing task
            this.userProfile.updateTask(editTaskId, {
                name,
                description,
                dueDate,
                priority,
                assignedTo,
                status,
                reminder,
                recurring,
                notes
            });
            window.notifications.success('Task Updated', 'Task has been updated successfully.');
        } else {
            // Create new task
            const task = new Task(name, description, dueDate, priority, assignedTo, status, reminder, recurring, notes);
            this.userProfile.addTask(task);
            window.notifications.success('Task Created', 'New task has been created successfully.');
        }

        // Close modal
        this.closeTaskModal();

        // Update display
        this.renderTasks();
        this.updateStats();
    }

    renderTasks() {
        let filteredTasks = this.userProfile.tasks;

        // Apply search filter
        if (this.searchQuery) {
            filteredTasks = this.userProfile.searchTasks(this.searchQuery);
        }

        // Apply status filters
        filteredTasks = filteredTasks.filter(task => {
            if (task.status === 'pending' && !this.currentFilters.pending) return false;
            if (task.status === 'in-progress' && !this.currentFilters.inProgress) return false;
            if (task.status === 'completed' && !this.currentFilters.completed) return false;
            if (task.isOverdue() && !this.currentFilters.overdue) return false;
            return true;
        });

        // Apply sorting
        filteredTasks.sort((a, b) => {
            switch (this.currentSort) {
                case 'dueDate':
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'priority':
                    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'assignedTo':
                    return a.assignedTo.localeCompare(b.assignedTo);
                default:
                    return 0;
            }
        });

        const tasksList = document.getElementById('tasksList');
        
        if (filteredTasks.length === 0) {
            tasksList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>No tasks found. Create your first task to get started.</p>
                </div>
            `;
            return;
        }

        tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
    }

    createTaskHTML(task) {
        const overdueClass = task.isOverdue() ? 'overdue' : '';
        const dueSoonClass = task.isDueSoon() ? 'due-soon' : '';
        const completedClass = task.status === 'completed' ? 'completed' : '';
        
        return `
            <div class="task-item ${overdueClass} ${dueSoonClass} ${completedClass}" data-task-id="${task.id}">
                <div class="task-header">
                    <div>
                        <div class="task-title">${task.name}</div>
                        <span class="task-priority ${task.priority}">${task.priority}</span>
                    </div>
                    <div class="task-actions">
                        <button class="task-btn edit" onclick="window.taskManager.openTaskModal('${task.id}')" title="Edit task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="task-btn complete" onclick="window.taskManager.completeTask('${task.id}')" title="Mark as complete">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="task-btn delete" onclick="window.taskManager.deleteTask('${task.id}')" title="Delete task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
                
                <div class="task-details">
                    <div class="task-detail">
                        <i class="fas fa-calendar"></i>
                        <span class="task-due-date ${task.isOverdue() ? 'overdue' : task.isDueSoon() ? 'due-soon' : ''}">
                            ${task.getFormattedDueDate()}
                        </span>
                    </div>
                    <div class="task-detail">
                        <i class="fas fa-user"></i>
                        <span>${task.assignedTo}</span>
                    </div>
                    <div class="task-detail">
                        <i class="fas fa-bell"></i>
                        <span>${task.getFormattedReminder()}</span>
                    </div>
                    <div class="task-detail">
                        <i class="fas fa-redo"></i>
                        <span>${task.recurring === 'none' ? 'No recurrence' : task.recurring}</span>
                    </div>
                </div>
                
                <div class="task-meta">
                    <div class="task-assigned">
                        <div class="task-assigned-avatar">${task.assignedTo.charAt(0).toUpperCase()}</div>
                        <span>${task.assignedTo}</span>
                    </div>
                    <span class="task-status ${task.status}">${task.status}</span>
                </div>
            </div>
        `;
    }

    completeTask(taskId) {
        const task = this.userProfile.tasks.find(t => t.id === taskId);
        if (task) {
            task.markCompleted();
            this.userProfile.save();
            this.renderTasks();
            this.updateStats();
            window.notifications.success('Task Completed', `"${task.name}" has been marked as completed.`);
        }
    }

    deleteTask(taskId) {
        const task = this.userProfile.tasks.find(t => t.id === taskId);
        if (task && confirm(`Are you sure you want to delete "${task.name}"?`)) {
            this.userProfile.removeTask(taskId);
            this.renderTasks();
            this.updateStats();
            window.notifications.success('Task Deleted', 'Task has been removed.');
        }
    }

    updateStats() {
        const totalTasks = this.userProfile.tasks.length;
        const pendingTasks = this.userProfile.getTasksByStatus('pending').length;
        const completedTasks = this.userProfile.getTasksByStatus('completed').length;
        const overdueTasks = this.userProfile.getOverdueTasks().length;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('overdueTasks').textContent = overdueTasks;
    }

    // Check for overdue and due soon tasks
    checkTaskNotifications() {
        const overdueTasks = this.userProfile.getOverdueTasks();
        const dueSoonTasks = this.userProfile.getTasksDueSoon();

        overdueTasks.forEach(task => {
            window.notifications.warning(
                'Overdue Task',
                `"${task.name}" is overdue. Due date: ${task.getFormattedDueDate()}`,
                10000
            );
        });

        dueSoonTasks.forEach(task => {
            window.notifications.info(
                'Task Due Soon',
                `"${task.name}" is due soon. Due date: ${task.getFormattedDueDate()}`,
                8000
            );
        });
    }
}

// Dashboard Manager
class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.updateDashboardData();
        this.setupRefreshInterval();
    }

    updateDashboardData() {
        // Simulate real-time data updates
        const aiModels = Math.floor(Math.random() * 20) + 10;
        const performance = Math.floor(Math.random() * 10) + 90;
        const tasks = Math.floor(Math.random() * 50) + 10;
        const users = Math.floor(Math.random() * 200) + 100;

        // Update dashboard cards
        document.querySelector('.dashboard-card:nth-child(1) .card-number').textContent = aiModels;
        document.querySelector('.dashboard-card:nth-child(2) .card-number').textContent = performance + '%';
        document.querySelector('.dashboard-card:nth-child(3) .card-number').textContent = tasks;
        document.querySelector('.dashboard-card:nth-child(4) .card-number').textContent = users;
    }

    setupRefreshInterval() {
        // Update dashboard data every 30 seconds
        setInterval(() => {
            this.updateDashboardData();
        }, 30000);
    }
}

// Voice to Action Section
const startBtn = document.getElementById('startVoice');
const transcriptArea = document.getElementById('voiceTranscript');
const statusDiv = document.getElementById('voiceStatus');
const saveBtn = document.getElementById('saveVoiceCommand');

let recognition;
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  startBtn.onclick = () => {
    recognition.start();
    statusDiv.textContent = "Listening...";
    startBtn.classList.add('recording');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    transcriptArea.value = transcript;
    statusDiv.textContent = "Voice captured!";
    saveBtn.disabled = false;
    startBtn.classList.remove('recording');
  };

  recognition.onerror = (event) => {
    statusDiv.textContent = "Error: " + event.error;
    startBtn.classList.remove('recording');
  };

  recognition.onend = () => {
    if (!transcriptArea.value) statusDiv.textContent = "Click the mic to start";
    startBtn.classList.remove('recording');
  };
} else {
  statusDiv.textContent = "Speech recognition not supported in this browser.";
  startBtn.disabled = true;
}

saveBtn.onclick = () => {
  alert('Voice command saved (frontend only, no backend yet):\n' + transcriptArea.value);
  saveBtn.disabled = true;
};

// Main Application Class
class AIManagerApp {
    constructor() {
        this.userProfile = new UserProfile();
        this.notifications = new NotificationSystem();
        this.themeManager = new ThemeManager();
        this.navigation = new NavigationManager();
        this.profileManager = new ProfileManager(this.userProfile);
        this.dashboardManager = new DashboardManager();
        this.calendarManager = new CalendarManager(this.userProfile);
        this.textToActionManager = new TextToActionManager(this.userProfile);
        this.taskManager = new TaskManager(this.userProfile);
        this.fileManager = new FileManager();
        
        this.init();
    }

    init() {
        // Make instances globally available
        window.userProfile = this.userProfile;
        window.notifications = this.notifications;
        window.themeManager = this.themeManager;
        window.calendarManager = this.calendarManager;
        window.textToActionManager = this.textToActionManager;
        window.taskManager = this.taskManager;
        window.fileManager = this.fileManager;
        
        // Initialize with default data if no profile exists
        if (!localStorage.getItem('userProfile')) {
            this.initializeDefaultProfile();
        }
        
        // Show welcome message
        setTimeout(() => {
            this.notifications.info(
                'Welcome to AI Manager!', 
                'Your AI management dashboard is ready. Start by customizing your profile.',
                5000
            );
        }, 1000);

        // Set up action notification checks
        this.setupActionNotifications();
    }

    setupActionNotifications() {
        // Check for overdue and due soon actions every 5 minutes
        setInterval(() => {
            this.textToActionManager.checkActionNotifications();
            this.taskManager.checkTaskNotifications();
        }, 5 * 60 * 1000);

        // Initial check after 10 seconds
        setTimeout(() => {
            this.textToActionManager.checkActionNotifications();
            this.taskManager.checkTaskNotifications();
        }, 10000);
    }

    initializeDefaultProfile() {
        const defaultProfile = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'AI enthusiast and technology manager',
            preferences: {
                emailNotifications: true,
                pushNotifications: true,
                aiSuggestions: true,
                analytics: false
            },
            settings: {
                profileVisibility: 'public',
                dataSharing: 'standard',
                theme: 'light',
                language: 'en',
                timezone: 'UTC',
                aiModel: 'gpt-4',
                responseLength: 'medium'
            },
            events: [],
            textInputs: [],
            actions: [],
            tasks: []
        };
        
        this.userProfile.update(defaultProfile);
        this.profileManager.loadProfileData();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiManagerApp = new AIManagerApp();
});

// Add slideOut animation for notifications
const style = document.createElement('style');
style.textContent = `
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
`;
document.head.appendChild(style); 