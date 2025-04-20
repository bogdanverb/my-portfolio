import React from 'react';
import Layout from '../components/Layout';

const Resume = () => {
    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4">Резюме</h1>
                <p className="mb-4">Здесь вы можете найти информацию о моем опыте работы, образовании и навыках.</p>
                
                <h2 className="text-2xl font-semibold mt-6">Опыт работы</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Должность 1 - Компания 1 (Год - Год)</li>
                    <li>Должность 2 - Компания 2 (Год - Год)</li>
                    <li>Должность 3 - Компания 3 (Год - Год)</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">Образование</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Степень - Учебное заведение (Год - Год)</li>
                    <li>Степень - Учебное заведение (Год - Год)</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-6">Навыки</h2>
                <ul className="list-disc list-inside mb-4">
                    <li>Навык 1</li>
                    <li>Навык 2</li>
                    <li>Навык 3</li>
                </ul>
            </div>
        </Layout>
    );
};

export default Resume;