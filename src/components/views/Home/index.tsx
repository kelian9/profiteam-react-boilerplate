import React from 'react';
import BoilerplateLogo from '../../../assets/images/boilerplate-logo.png';
import styles from './style.module.scss';

const Home: React.FC = () => {
	return (
		<div className={styles.container}>
			<img src={BoilerplateLogo} alt='' />
			<h1>Profiteam React Boilerplate</h1>
			<div className={styles.links}>
				<a target='_blank' href='https://profiteam-react-boilerplate.gitbook.io/profiteam-react-boilerplate/'>
					<svg className={styles.icon} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						{/* eslint-disable */}
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							d='M7 6H17V18H7V6ZM5 20V4H19V20H5ZM15 9H8V10H15V9ZM8 11H15V12H8V11ZM12 13H8V14H12V13Z'
							fill='currentColor'
						>
						</path>
						{/* eslint-enable */}
					</svg>
					Documentation
				</a>
				<a target='_blank' href='https://github.com/kelian9/profiteam-react-boilerplate'>
					<svg className={styles.icon} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<path
							fill-rule='evenodd'
							clip-rule='evenodd'
							// eslint-disable-next-line max-len
							d='M12 3C7.02762 3 3 7.02762 3 12C3 15.9779 5.58011 19.3481 9.1547 20.5414C9.60221 20.6243 9.76796 20.3481 9.76796 20.105C9.76796 19.8895 9.76243 19.326 9.75691 18.5746C7.25414 19.116 6.72376 17.3702 6.72376 17.3702C6.31492 16.3315 5.72376 16.0497 5.72376 16.0497C4.90608 15.4917 5.78453 15.5028 5.78453 15.5028C6.68508 15.5691 7.16575 16.4309 7.16575 16.4309C7.96685 17.8066 9.27072 17.4088 9.78453 17.1768C9.8674 16.5967 10.0994 16.1989 10.3536 15.9724C8.35912 15.7514 6.25967 14.9779 6.25967 11.5304C6.25967 10.547 6.60773 9.74585 7.18785 9.11602C7.09392 8.88398 6.78453 7.97237 7.27072 6.73481C7.27072 6.73481 8.02762 6.49171 9.74586 7.65746C10.4641 7.45856 11.232 7.35912 12 7.35359C12.7624 7.35912 13.5359 7.45856 14.2541 7.65746C15.9724 6.49171 16.7293 6.73481 16.7293 6.73481C17.221 7.97237 16.9116 8.8895 16.8177 9.11602C17.3923 9.74585 17.7403 10.547 17.7403 11.5304C17.7403 14.9889 15.6354 15.7459 13.6298 15.9724C13.9503 16.2486 14.2431 16.8011 14.2431 17.6409C14.2431 18.8453 14.232 19.8122 14.232 20.1105C14.232 20.3536 14.3923 20.6298 14.8508 20.5414C18.4254 19.3481 21 15.9779 21 12.0055C21 7.02762 16.9724 3 12 3Z'
							fill='currentColor'
						>
							<></>
						</path>
					</svg>
					Github
				</a>
			</div>
			<span>
				Created by <a href='https://t.me/kelian9'>Profiteam</a>.
			</span>
		</div>
	);
};

export default Home;
