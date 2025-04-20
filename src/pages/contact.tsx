import React from 'react';
import Layout from '../components/Layout';

const Contact: React.FC = () => {
    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6">Контакты</h1>
                <p className="mb-4">Если у вас есть вопросы или предложения, не стесняйтесь связаться со мной!</p>
                <form name="contact" method="POST" data-netlify="true" className="flex flex-col">
                    <label htmlFor="name" className="mb-2">Имя:</label>
                    <input type="text" id="name" name="name" required className="border p-2 mb-4" />

                    <label htmlFor="email" className="mb-2">Email:</label>
                    <input type="email" id="email" name="email" required className="border p-2 mb-4" />

                    <label htmlFor="message" className="mb-2">Сообщение:</label>
                    <textarea id="message" name="message" required className="border p-2 mb-4" rows={5} />

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Отправить</button>
                </form>
            </div>
        </Layout>
    );
};

export default Contact;