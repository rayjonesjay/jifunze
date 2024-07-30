document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/user-data')
    .then(response => response.json())
    .then(data => {
        // Assuming data contains user info and their blockchain transactions
        const userCourses = data.courses;
        const achievements = data.achievements;

        // Display user data
        const userNameElement = document.getElementById('user-name');
        userNameElement.textContent = `Welcome, ${data.username}`;

        // Display course progress
        const coursesListElement = document.getElementById('courses-list');
        userCourses.forEach(course => {
            const courseElement = document.createElement('li');
            courseElement.textContent = `${course.name} - ${course.progress}% complete`;
            coursesListElement.appendChild(courseElement);
        });

        // Display achievements
        const achievementsListElement = document.getElementById('achievements-list');
        achievements.forEach(achievement => {
            const achievementElement = document.createElement('li');
            achievementElement.textContent = `Completed: ${achievement.courseName} on ${new Date(achievement.completedAt).toLocaleDateString()}`;
            achievementsListElement.appendChild(achievementElement);
        });
    })
    .catch(error => console.error('Error fetching user data:', error));
});
