export const getProjects = async () => {
    const response = await fetch('/api/projects');
    if (!response.ok) {
        throw new Error('Ошибка при получении проектов');
    }
    return response.json();
};

export const getBlogPosts = async () => {
    const response = await fetch('/api/blog');
    if (!response.ok) {
        throw new Error('Ошибка при получении постов блога');
    }
    return response.json();
};

export const saveProject = async (project: any) => {
    const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });
    if (!response.ok) {
        throw new Error('Ошибка при сохранении проекта');
    }
    return response.json();
};

export const saveBlogPost = async (post: any) => {
    const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error('Ошибка при сохранении поста блога');
    }
    return response.json();
};