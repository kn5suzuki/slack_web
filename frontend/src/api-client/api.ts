/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ChannelData
 */
export interface ChannelData {
    /**
     * 
     * @type {string}
     * @memberof ChannelData
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof ChannelData
     */
    'name': string;
}
/**
 * 
 * @export
 * @interface CountData
 */
export interface CountData {
    /**
     * 
     * @type {string}
     * @memberof CountData
     */
    'ts': string;
    /**
     * 
     * @type {string}
     * @memberof CountData
     */
    'text': string;
    /**
     * 
     * @type {string}
     * @memberof CountData
     */
    'senderId': string;
}
/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    'detail'?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface MemberData
 */
export interface MemberData {
    /**
     * 
     * @type {string}
     * @memberof MemberData
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof MemberData
     */
    'name': string;
}
/**
 * 
 * @export
 * @interface MessageData
 */
export interface MessageData {
    /**
     * 
     * @type {string}
     * @memberof MessageData
     */
    'ts': string;
    /**
     * 
     * @type {string}
     * @memberof MessageData
     */
    'text': string;
    /**
     * 
     * @type {string}
     * @memberof MessageData
     */
    'senderId': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof MessageData
     */
    'reactorIds': Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof MessageData
     */
    'replyUserIds': Array<string>;
}
/**
 * 
 * @export
 * @interface PostMessageData
 */
export interface PostMessageData {
    /**
     * 
     * @type {string}
     * @memberof PostMessageData
     */
    'channel_id': string;
    /**
     * 
     * @type {string}
     * @memberof PostMessageData
     */
    'text': string;
}
/**
 * 
 * @export
 * @interface ReplyData
 */
export interface ReplyData {
    /**
     * 
     * @type {string}
     * @memberof ReplyData
     */
    'channel_id': string;
    /**
     * 
     * @type {string}
     * @memberof ReplyData
     */
    'ts': string;
    /**
     * 
     * @type {string}
     * @memberof ReplyData
     */
    'message': string;
    /**
     * 
     * @type {Array<string>}
     * @memberof ReplyData
     */
    'mention_ids'?: Array<string>;
}
/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<ValidationErrorLocInner>}
     * @memberof ValidationError
     */
    'loc': Array<ValidationErrorLocInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'msg': string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'type': string;
}
/**
 * 
 * @export
 * @interface ValidationErrorLocInner
 */
export interface ValidationErrorLocInner {
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Count Posts
         * @param {string} channelId 
         * @param {string} query 
         * @param {string} [month] 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        countPostsCountGet: async (channelId: string, query: string, month?: string, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'channelId' is not null or undefined
            assertParamExists('countPostsCountGet', 'channelId', channelId)
            // verify required parameter 'query' is not null or undefined
            assertParamExists('countPostsCountGet', 'query', query)
            const localVarPath = `/count`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (channelId !== undefined) {
                localVarQueryParameter['channel_id'] = channelId;
            }

            if (query !== undefined) {
                localVarQueryParameter['query'] = query;
            }

            if (month !== undefined) {
                localVarQueryParameter['month'] = month;
            }

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary List Channels
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listChannelsChannelsGet: async (authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/channels`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary List Members
         * @param {string} channelId 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listMembersMembersGet: async (channelId: string, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'channelId' is not null or undefined
            assertParamExists('listMembersMembersGet', 'channelId', channelId)
            const localVarPath = `/members`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (channelId !== undefined) {
                localVarQueryParameter['channel_id'] = channelId;
            }

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary List Messages
         * @param {string} channelId 
         * @param {string} query 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listMessagesMessagesGet: async (channelId: string, query: string, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'channelId' is not null or undefined
            assertParamExists('listMessagesMessagesGet', 'channelId', channelId)
            // verify required parameter 'query' is not null or undefined
            assertParamExists('listMessagesMessagesGet', 'query', query)
            const localVarPath = `/messages`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (channelId !== undefined) {
                localVarQueryParameter['channel_id'] = channelId;
            }

            if (query !== undefined) {
                localVarQueryParameter['query'] = query;
            }

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Post Message
         * @param {PostMessageData} postMessageData 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postMessageChannelsPost: async (postMessageData: PostMessageData, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'postMessageData' is not null or undefined
            assertParamExists('postMessageChannelsPost', 'postMessageData', postMessageData)
            const localVarPath = `/channels`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(postMessageData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Post Reply
         * @param {ReplyData} replyData 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postReplyReplyPost: async (replyData: ReplyData, authorization?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'replyData' is not null or undefined
            assertParamExists('postReplyReplyPost', 'replyData', replyData)
            const localVarPath = `/reply`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (authorization != null) {
                localVarHeaderParameter['authorization'] = String(authorization);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(replyData, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Count Posts
         * @param {string} channelId 
         * @param {string} query 
         * @param {string} [month] 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async countPostsCountGet(channelId: string, query: string, month?: string, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CountData>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.countPostsCountGet(channelId, query, month, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary List Channels
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listChannelsChannelsGet(authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ChannelData>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listChannelsChannelsGet(authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary List Members
         * @param {string} channelId 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listMembersMembersGet(channelId: string, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MemberData>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listMembersMembersGet(channelId, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary List Messages
         * @param {string} channelId 
         * @param {string} query 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listMessagesMessagesGet(channelId: string, query: string, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<MessageData>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.listMessagesMessagesGet(channelId, query, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Post Message
         * @param {PostMessageData} postMessageData 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postMessageChannelsPost(postMessageData: PostMessageData, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postMessageChannelsPost(postMessageData, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Post Reply
         * @param {ReplyData} replyData 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async postReplyReplyPost(replyData: ReplyData, authorization?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.postReplyReplyPost(replyData, authorization, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Count Posts
         * @param {string} channelId 
         * @param {string} query 
         * @param {string} [month] 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        countPostsCountGet(channelId: string, query: string, month?: string, authorization?: string, options?: any): AxiosPromise<Array<CountData>> {
            return localVarFp.countPostsCountGet(channelId, query, month, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary List Channels
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listChannelsChannelsGet(authorization?: string, options?: any): AxiosPromise<Array<ChannelData>> {
            return localVarFp.listChannelsChannelsGet(authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary List Members
         * @param {string} channelId 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listMembersMembersGet(channelId: string, authorization?: string, options?: any): AxiosPromise<Array<MemberData>> {
            return localVarFp.listMembersMembersGet(channelId, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary List Messages
         * @param {string} channelId 
         * @param {string} query 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listMessagesMessagesGet(channelId: string, query: string, authorization?: string, options?: any): AxiosPromise<Array<MessageData>> {
            return localVarFp.listMessagesMessagesGet(channelId, query, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Post Message
         * @param {PostMessageData} postMessageData 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postMessageChannelsPost(postMessageData: PostMessageData, authorization?: string, options?: any): AxiosPromise<string> {
            return localVarFp.postMessageChannelsPost(postMessageData, authorization, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Post Reply
         * @param {ReplyData} replyData 
         * @param {string} [authorization] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        postReplyReplyPost(replyData: ReplyData, authorization?: string, options?: any): AxiosPromise<string> {
            return localVarFp.postReplyReplyPost(replyData, authorization, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Count Posts
     * @param {string} channelId 
     * @param {string} query 
     * @param {string} [month] 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public countPostsCountGet(channelId: string, query: string, month?: string, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).countPostsCountGet(channelId, query, month, authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary List Channels
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public listChannelsChannelsGet(authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).listChannelsChannelsGet(authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary List Members
     * @param {string} channelId 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public listMembersMembersGet(channelId: string, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).listMembersMembersGet(channelId, authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary List Messages
     * @param {string} channelId 
     * @param {string} query 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public listMessagesMessagesGet(channelId: string, query: string, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).listMessagesMessagesGet(channelId, query, authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Post Message
     * @param {PostMessageData} postMessageData 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public postMessageChannelsPost(postMessageData: PostMessageData, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).postMessageChannelsPost(postMessageData, authorization, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Post Reply
     * @param {ReplyData} replyData 
     * @param {string} [authorization] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public postReplyReplyPost(replyData: ReplyData, authorization?: string, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).postReplyReplyPost(replyData, authorization, options).then((request) => request(this.axios, this.basePath));
    }
}


