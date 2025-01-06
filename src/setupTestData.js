export function setupTestData() {
  const testData = [
    {
      id: 'nodejs-path',
      title: 'Getting Started with Node.js',
      description: 'Learn the fundamentals of Node.js and build your first server',
      image: 'https://i.ytimg.com/vi/TlB_eWDSMt4/maxresdefault.jpg',
      author: 'testuser',
      createdAt: new Date().toISOString(),
      rating: 4.5,
      ratings: {
        user1: 5,
        user2: 4
      },
      items: [
        {
          id: 'nodejs-intro',
          title: 'Introduction to Node.js',
          description: 'Learn what Node.js is and why it\'s popular',
          url: 'https://nodejs.org/en/docs/guides/getting-started-guide/',
          image: 'https://nodejs.org/static/images/logo.svg'
        },
        {
          id: 'nodejs-video',
          title: 'Node.js Crash Course',
          description: 'YouTube video covering Node.js basics',
          url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4',
          image: 'https://i.ytimg.com/vi/fBNz5xF-Kx4/maxresdefault.jpg'
        },
        {
          id: 'nodejs-express',
          title: 'Building Web Servers with Express',
          description: 'Learn how to create web servers using Express.js',
          url: 'https://expressjs.com/en/starter/hello-world.html',
          image: 'https://expressjs.com/images/express-facebook-share.png'
        }
      ]
    },
    {
      id: 'react-path',
      title: 'Mastering React',
      description: 'Become proficient in React development',
      image: 'https://i.ytimg.com/vi/DLX62G4lc44/maxresdefault.jpg',
      author: 'testuser2',
      createdAt: new Date().toISOString(),
      rating: 4.2,
      ratings: {
        user1: 4,
        user2: 5
      },
      items: [
        {
          id: 'react-intro',
          title: 'React Official Documentation',
          description: 'The official React documentation',
          url: 'https://reactjs.org/docs/getting-started.html',
          image: 'https://reactjs.org/logo-og.png'
        },
        {
          id: 'react-video',
          title: 'React Crash Course',
          description: 'YouTube video covering React basics',
          url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
          image: 'https://i.ytimg.com/vi/w7ejDZ8SWv8/maxresdefault.jpg'
        },
        {
          id: 'react-hooks',
          title: 'React Hooks Guide',
          description: 'Learn how to use React hooks effectively',
          url: 'https://reactjs.org/docs/hooks-intro.html',
          image: 'https://reactjs.org/logo-og.png'
        }
      ]
    },
    {
      id: 'python-path',
      title: 'Python Programming Basics',
      description: 'Learn Python programming from scratch',
      image: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg',
      author: 'testuser3',
      createdAt: new Date().toISOString(),
      rating: 4.7,
      ratings: {
        user1: 5,
        user2: 5
      },
      items: [
        {
          id: 'python-intro',
          title: 'Python Official Tutorial',
          description: 'The official Python tutorial',
          url: 'https://docs.python.org/3/tutorial/',
          image: 'https://www.python.org/static/opengraph-icon-200x200.png'
        },
        {
          id: 'python-video',
          title: 'Python for Beginners',
          description: 'YouTube video covering Python basics',
          url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
          image: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/maxresdefault.jpg'
        },
        {
          id: 'python-django',
          title: 'Django Web Framework',
          description: 'Learn how to build web applications with Django',
          url: 'https://docs.djangoproject.com/en/4.0/intro/tutorial01/',
          image: 'https://www.djangoproject.com/m/img/logos/django-logo-positive.png'
        }
      ]
    }
  ]

  // Save test data to localStorage
  localStorage.setItem('learningPaths', JSON.stringify(testData))
  
  // Create test users
  const testUsers = ['testuser', 'testuser2', 'testuser3']
  localStorage.setItem('learningPlatformUsers', JSON.stringify(testUsers))
  
  // Initialize progress data
  localStorage.setItem('learningProgress', JSON.stringify({
    'nodejs-path': {
      'nodejs-intro': true,
      'nodejs-video': false
    },
    'react-path': {
      'react-intro': true,
      'react-video': true
    }
  }))
}
