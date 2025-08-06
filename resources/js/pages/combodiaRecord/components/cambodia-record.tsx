import { usePage } from '@inertiajs/react';
import styled from 'styled-components';

// const categories = [
//   {id:'1', name: 'Conflict', image: '/assets/demo-images/conflict.webp' },
//   {id:'2', name: 'History', image: '/assets/demo-images/hestory.jpg' },
//   {id:'3', name: 'Culture', image: '/assets/demo-images/culture.webp' },
//   {id:'4', name: 'Tradition', image: '/assets/demo-images/tradition.jpg' },
// ];

const CambodiaRecord = () => {
    const { categories } = usePage().props;
    return (
        <StyledWrapper>
            <div className="mx-auto max-w-screen-xl">
                <div className="grid">
                    {categories.map((category, index) => (
                        <a href={`/posts?category_code=${category.code}`} key={index} className="card">
                            <div className="image-container">
                                <img src={`/assets/images/post_categories/${category.image}`} alt={category.name} />
                                <div className="overlay" />
                            </div>
                            <h3 className="title text-center">{category.name}</h3>
                        </a>
                    ))}
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .section-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
        color: #1f2937;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
    }

    .card {
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        text-decoration: none;
        color: inherit;

        &:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
    }

    .image-container {
        position: relative;
        overflow: hidden;
        height: 180px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }

        .overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover img {
            transform: scale(1.05);
        }

        &:hover .overlay {
            opacity: 1;
        }
    }

    .title {
        padding: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        color: #111827;
    }
`;

export default CambodiaRecord;
