import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NextRouter } from 'next/router';
import { FunctionComponent, ReactNode } from 'react';

export type EditURLServerRequest = {
    req: {
        __NEXT_INIT_QUERY: { key: string; };
    };
};

export type EditPostServerRequest = {
    req: {
        __NEXT_INIT_QUERY: { id: string; };
    };
};

export type BlogProps = {
    urqlState: {
        [key: string]: any;
        data: string;
    }
}

export type EditURLProps = {
    editKey: string;
};

export type EditPostProps = {
    editID: string;
};

export type ScrollProps = {
    enabled: boolean;
}

export type URL = {
    _id: string;
    key: string;
    dest: string;
    createdAt: number;
    updatedAt: number;
};

export type HomeProps = {
    posts: Array<Post>;
    router: NextRouter;
};

export type StaticPropsResult = {
	urqlState: {[key: string]: { data: any }};
}

export type ParsedStaticProps = {
    posts: Array<Post>
};

export type FooterProps = {
    router: NextRouter;
};


export type Post = {
    _id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    views: number;
    createdAt: number;
    updatedAt: number;
};

export type CreatePostState = {
    title: string;
    description: string;
    content: string;
    tags: string;
    type: string;
};

export type User = {
    _id: string;
    username: string;
    password: string;
    bio: string;
    avatar: string;
    createdAt: number;
    updatedAt: number;
}

export type SEOProps = {
    openGraph: {
        [key: string]: string | undefined;
        site?: string;
        title?: string;
        description?: string;
        image?: string;
        url?: string;
        type?: 'article' | 'content';
    }
    themeColor?: string;
    name: string;
};

export type InputField = {
    value: string;
    error: string;
};

export type FieldProps = {
    name: string;
    leftIcon: IconProp;
    rightIcon: IconProp;
    field: InputField;
    children: ReactNode;
};

export type LinkProps = {
    name: string;
    to: string;
    classes: string;
}

export type NotificationProps = {
    name: string;
    message: string;
    persist: boolean;
    color?: string;
};

export type NotificationState = NotificationProps[];

export interface INotificationContext {
	notifications: NotificationState;
	/* eslint-disable no-unused-vars */
	createNotification: (props: NotificationProps) => void;
	deleteNotification: (name: string) => void;
}

export type WithNotificationProps = {
    Content: FunctionComponent;
    notification: NotificationProps;
};

export type SearchResult = {
    tags: string[];
    title: string;
};

export type ListElementProps = {
    name: string;
    selected: string;
    router: NextRouter;
};

export type DashboardProps = {
    children?: ReactNode;
    router: NextRouter;
    data: any;
    name: string;
};

export type PostListProps = {
    posts: Array<Post>;
    router: NextRouter;
};

export type URLProps = {
	urls: Array<URL>;
};

export type CookieProps = {
    maxAge?: number;
    path?: string;
    key: string;
    value: string;
};

export type Cookie = CookieProps | null;
