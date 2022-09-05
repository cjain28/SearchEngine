import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

import { useResultContext } from "../context/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
    const { results, isLoading, getResults, searchTerm } = useResultContext();
    const location = useLocation();

    useEffect(() => {
        if (searchTerm) {
            if (location.pathname === '/videos') {
                getResults(`/search/q=${searchTerm} videos`);
            }
            else {
                getResults(`${location.pathname}/q=${searchTerm}&num=50`)
            }
        }
    }, [searchTerm, location.pathname]);

    if (isLoading) return <Loading />;

    switch (location.pathname) {
        case '/search':
            return (
                <div className="flex flex-wrap justiy-between space-y-6 sm:px-56">
                    {results?.map(({ link, title }, index) => (
                        <div key={index} className="md: w-2/5 w-full">
                            <a href={link}>
                                <p className="text-sm">
                                    {link.length > 30 ? link.substring(0, 30) : link}
                                </p>
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            );
        case '/image':
            return (
                <div className="flex flex-wrap justify-center items-center">
                    {results?.map(({ image, link: { href, title } }, index) => (
                        <a className="sm:p-3 p-5" href={href} key={index}>
                            <img src={image?.src} alt={title} loading="lazy" />
                            <p className="W-36 break-words text-sm mt-2">
                                {title}
                            </p>
                        </a>
                    ))}
                </div>
            );
        case '/news':
            return (
                <div className="flex flex-wrap justiy-between space-y-6 sm:px-56 items-center">
                    {results?.map(({ links, id, source, title }) => (
                        <div key={id} className="md: w-2/5 w-full">
                            <a href={links?.[0].href} className="hover:underline">
                                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                                    {title}
                                </p>
                            </a>
                            <div className="flex gap-4">
                                <a href={source?.href} className="hover:underline">
                                    {source?.href}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            );
        case '/videos':
            return (
                <div className="ui-container dark:text-black">
                    {results?.map((video, index) => (
                        <div key={index} className="ui grid">
                            <div className="ui row">
                                <div className="eleven wide column">
                                    <h4 className="ui header">
                                        {video?.title}
                                    </h4>
                                    <div className="ui embed">
                                        {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links[0].href} />}
                                    </div>
                                    <div className="ui segment flex flex-wrap justiy-between space-y-6 sm:px-56 items-center">
                                        <p>{video?.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        default:
            return 'Error!';
    }
}