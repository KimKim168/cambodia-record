import styled from 'styled-components';
import Search from '../components/search';
import CamboLayout from '../layout/CamboLayout';
import { usePage } from '@inertiajs/react';

const Post = () => {
    // const tableData = [
    //     {
    //         id: 1,
    //         title: 'Solider station at the frontline on 27 July 2025 ',
    //         imageUrl: '/assets/demo-images/conflict.webp',
    //         buttonLabel: 'Details',
    //     },
    //     {
    //         id: 2,
    //         title: 'Conflict Zone Medic',
    //         imageUrl: '/assets/demo-images/conflict.webp',
    //         buttonLabel: 'Details',
    //     },
    //     {
    //         id: 3,
    //         title: 'Military Communications Officer',
    //         imageUrl: '/assets/demo-images/conflict.webp',
    //         buttonLabel: 'Details',
    //     },
    //     {
    //         id: 4,
    //         title: 'Reconnaissance Drone Operator',
    //         imageUrl: '/assets/demo-images/conflict.webp',
    //         buttonLabel: 'Details',
    //     },
    //     {
    //         id: 5,
    //         title: 'Field Intelligence Analyst',
    //         imageUrl: '/assets/demo-images/conflict.webp',
    //         buttonLabel: 'Details',
    //     },
    //     {
    //         id: 6,
    //         title: 'Combat Logistics Coordinator',
    //         imageUrl: '/assets/demo-images/conflict.webp',
    //         buttonLabel: 'Details',
    //     },
    // ];
    
    const { tableData } = usePage().props;

    return (
        <CamboLayout>
            <div className="mt-8">
                <Search />
            </div>
            <StyledWrapper className="font-kantumruy mx-auto grid max-w-screen-xl grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 xl:px-0">
                {tableData?.data?.map((item) => (
                    <a href={`/posts/${item.id}`} key={item.id} className="card">
                        <img src={`/assets/images/posts/${item?.images?.[0]?.image}`} alt={item.title} className="card__hero" />
                        <footer className="card__footer">
                            <p className="card__job-title line-clamp-2">{item.title}</p>
                            <button className="card__btn">Details</button>
                        </footer>
                    </a>
                ))}
            </StyledWrapper>    
        </CamboLayout>
    );
};

const StyledWrapper = styled.div`
    .card {
        background: #fff;
        border-radius: 1.5rem;
        box-shadow:
            8px 8px 20px rgba(0, 0, 0, 0.12),
            -8px -8px 20px rgba(255, 255, 255, 0.8);
        padding: 1rem;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .card:hover {
        transform: scale(1.02);
        box-shadow:
            12px 12px 30px rgba(0, 0, 0, 0.18),
            -12px -12px 30px rgba(255, 255, 255, 0.9);
    }

    .card__hero {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 1rem;
    }

    .card__footer {
        margin-top: 1.25rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .card__job-title {
        font-size: 1.10rem;
        font-weight: 500;
        color: #333;
    }

   .card__btn {
    padding: 0.6rem 1.4rem;
    background: linear-gradient(135deg, #1e3a8a, #1e40af); /* blue-900 and a lighter blue */
    border-radius: 2rem;
    border: none;
    font-weight: 500;
    color: white; /* to contrast with blue bg */
    box-shadow:
        inset 4px 4px 8px rgba(0, 0, 50, 0.6),
        inset -4px -4px 8px rgba(255, 255, 255, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
}

.card__btn:hover {
    box-shadow:
        inset 2px 2px 6px rgba(0, 0, 50, 0.5),
        inset -2px -2px 6px rgba(255, 255, 255, 0.2);
    background: linear-gradient(135deg, #1e40af, #2563eb); /* slightly lighter gradient on hover */
}

`;

export default Post;
