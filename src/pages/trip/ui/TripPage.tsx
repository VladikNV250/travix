import { FC } from 'react';
import { Link } from 'react-router';

import { motion } from 'framer-motion';
import { ChevronLeft, Play, Plus, Settings } from 'lucide-react';

import { Button } from 'shared/ui';
import { StopCard } from 'widgets/stop-card';

import { ANIMATION_VARIANTS } from '../config';
import { useTripPage } from '../model';

const TripPage: FC = () => {
	const { stopDisplay } = useTripPage();

	return (
		<motion.div
			className="flex h-full flex-col border-r border-gray-200 bg-white pt-21"
			variants={ANIMATION_VARIANTS}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.3 }}
		>
			<header className="flex flex-col gap-4 border-b border-gray-100 p-4">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-semibold text-gray-900">Trip Stops</h3>
					<div className="flex items-center gap-2">
						<Button
							variant="icon"
							size="icon-md"
							aria-label="Go back to trips list"
							asChild
						>
							<Link to="/">
								<ChevronLeft className="size-5" />
							</Link>
						</Button>
						<Button
							variant="icon"
							size="icon-md"
							aria-label="Open settings"
						>
							<Settings className="size-5" />
						</Button>
					</div>
				</div>
				<div className="flex w-full items-center justify-between gap-3">
					<Button
						variant="primary"
						className="w-1/2 bg-green-500 hover:bg-green-600"
					>
						<Plus className="size-4" />
						Add Stop
					</Button>
					<Button
						variant="primary"
						className="w-1/2 justify-center"
					>
						<Play className="size-4" />
						Play
					</Button>
				</div>
			</header>
			<div className="flex flex-1 flex-col overflow-y-auto">
				{stopDisplay.stops.map((stop, index) => (
					<StopCard
						key={stop.id}
						stop={stop}
						order={index + 1}
						isLast={index === stopDisplay.stops.length - 1}
					/>
				))}
			</div>
		</motion.div>
	);
};

export default TripPage;
