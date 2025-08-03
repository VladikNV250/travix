import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { DivIcon, Icon, IconOptions } from 'leaflet';

import { Stop } from 'entities/stop';
import { formatDate } from 'shared/lib';
import { SimpleLoaderDepracted } from 'shared/ui';

import { useStopMarker } from '../model';

interface StopMarkerProps {
	stop: Stop;
	icon?: Icon<IconOptions> | DivIcon;
}

export const StopMarker: FC<StopMarkerProps> = ({ stop, icon }) => {
	const { weather, holiday, isLoading, updateStopInfo } = useStopMarker();

	return (
		<Marker
			position={stop.location}
			icon={icon}
			eventHandlers={{
				click: async () => await updateStopInfo(stop),
			}}
		>
			<Popup>
				<div className="relative">
					{holiday && (
						<div className="absolute z-0 size-full">
							<div className="absolute top-0 -left-12 z-0 aspect-[120/145] w-11 -rotate-31 rounded-[80%] bg-red-500 text-red-700 opacity-25 inset-shadow-sm after:absolute after:-bottom-3 after:-z-100 after:block after:w-full after:text-center after:text-xl after:text-inherit after:content-['▲']" />
							<div className="absolute top-23 -right-6 z-0 aspect-[120/145] w-15 rotate-34 rounded-[80%] bg-lime-500 text-lime-700 opacity-25 inset-shadow-sm after:absolute after:-bottom-3 after:-z-100 after:block after:w-full after:text-center after:text-xl after:text-inherit after:content-['▲']" />
							<div className="absolute right-[70%] bottom-1.5 z-0 aspect-[120/145] w-18 rotate-12 rounded-[80%] bg-blue-500 text-blue-700 opacity-25 inset-shadow-sm after:absolute after:-bottom-3 after:-z-100 after:block after:w-full after:text-center after:text-xl after:text-inherit after:content-['▲']" />
						</div>
					)}
					<h4 className="relative text-center text-lg font-medium">
						{stop.address}
					</h4>
					{isLoading ? (
						<SimpleLoaderDepracted loading={isLoading} />
					) : (
						<>
							<div className="relative my-4 h-0.25 w-full rounded-xs bg-zinc-400" />
							<h4 className="relative text-center text-lg">Weather</h4>
							<p className="relative mb-3 text-center text-sm italic">
								{`On ${formatDate(new Date(stop.arrivalDate || Date.now()))}`}
							</p>
							{weather ? (
								<div className="relative flex flex-col gap-4">
									<div className="relative flex items-center justify-center gap-2">
										<img
											src={weather.icon}
											alt={weather.condition}
											className="size-12"
										/>
										<p className="m-0 text-lg font-medium">
											{Math.floor(weather.temperature)}
											&#8451;
										</p>
									</div>
									<p className="relative m-0 text-center text-sm">
										{weather.condition}
									</p>
								</div>
							) : (
								<p className="relative m-0 text-center text-sm">
									Weather is temporarily unavailable
								</p>
							)}
							<div className="relative my-4 h-0.25 w-full rounded-xs bg-zinc-400" />
							<h4 className="relative text-center text-lg">Holidays</h4>
							{holiday ? (
								<p className="relative mb-3 text-center text-sm italic">
									{holiday.name}
								</p>
							) : (
								<p className="relative mb-3 text-center text-sm italic">
									There are no holidays on this date
								</p>
							)}
						</>
					)}
				</div>
			</Popup>
		</Marker>
	);
};
