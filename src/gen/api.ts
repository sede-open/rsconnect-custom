/* tslint:disable */
/* eslint-disable */
/**
 * RStudio Connect API Reference
 * The RStudio Connect API can be used to perform certain user actions remotely. You will need to install a tool or library that can make HTTP requests, such as: - [httr](http://httr.r-lib.org/) (R HTTP library) - [cURL](https://curl.haxx.se/) (Linux tool for making HTTP calls) - [requests](https://requests.readthedocs.io/en/master/) (Python HTTP library)  Please note that all API paths are relative to the base API URL (e.g., <code>http:/localhost:3939/\\_\\_api\\_\\_</code>). Unless otherwise noted, all endpoints which accept a request body will require the body to be in JSON format. Similarly, all response bodies will be returned in JSON format.  <a id=\"versioning-policy\"></a> # Versioning of the API  The RStudio Connect Server API uses a simple, single number versioning scheme as noted as the first part of each endpoint path.  This version number will only be incremented in the event that non-backward compatible changes are made to an existing endpoint. Note that this occurs on a per-endpoint basis; see the section on [deprecation](#deprecation) below for more information.  Changes that are considered backward compatible are:  * New fields in responses. * New non-required fields in requests. * New endpoint behavior which does not violate the current functional intent of the   endpoint.  Changes that are considered non-backward compatible are:  * Removal or rename of request or response fields. * A change of the type or format of one or more request or response fields. * Addition of new required request fields. * A substantial deviation from the current functional intent of the endpoint.  The points relating to functional intent are assumed to be extremely rare as more often such situations will result in a completely new endpoint, which makes the change a backward compatible addition.  ## Experimentation  RStudio Connect labels experimental endpoints in the API by including `/experimental` in the endpoint path immediately after the version indicator.  If an endpoint is noted as experimental, it should not be relied upon for any production work.  These are endpoints that RStudio Connect is making available to our customers to solicit feedback; they are subject to change without notice.  Such changes include anything from altered request/response shapes, to complete abandonment of the endpoint.  This public review of an experimental endpoint will last as long as necessary to either prove its viability or to determine that it’s not really needed.  The time for this will vary based on the intricacies of each endpoint.  When the endpoint is finalized, the next release of RStudio Connect will mark the experimental path as deprecated while adding the endpoint without the `/experimental` prefix. The path with the experimental prefix will be removed six months later.  The documentation for the endpoint will also note, during that time, the original, experimental, path.  All experimental endpoints are clearly marked as such in this documentation.  <a id=\"deprecation\"></a> ## Deprecation and Removal of Old Versions  It is possible that RStudio Connect may decide to deprecate an endpoint.  This will happen if either the endpoint serves no useful purpose because it’s functionality is now handled by a different endpoint or because there is a newer version of the endpoint that should be used.  If a deprecated endpoint is called, the response to it will include an extra HTTP header called, `X-Deprecated-Endpoint` and will have as a value the path of the endpoint that should be used instead.  If the functionality has no direct replacement, the value will be set to `n/a`.  Deprecated versions of an endpoint will be supported for 1 year from the release date of RStudio Connect in which the endpoint was marked as deprecated.  At that time, the endpoint is subject to removal at the discretion of RStudio Connect.  The life cycle of an endpoint will follow these steps.  1. The `/v1/endpoint` is public and in use by RStudio Connect customers. 1. RStudio Connect makes `/v2/experimental/endpoint` available for testing and feedback.    Customers should still use `/v1/endpoint` for production work. 1. RStudio Connect moves version 2 of the endpoint out of experimentation so, all within    the same release:     1. `/v1/endpoint` is marked as deprecated.     1. `/v2/experimental/endpoint` is marked as deprecated.     1. `/v2/endpoint` is made public. 1. Six months later, `/v2/experimental/endpoint` is removed from the product. 1. Twelve months later, `/v1/endpoint` is removed from the product.  Note that it is possible that RStudio Connect may produce a new version of an existing endpoint without making an experimental version of it first.  The same life cycle, without those parts, will still be followed.  <a id=\"authentication\"> </a> # Authentication  Most endpoints require you to identify yourself as a valid RStudio Connect user. You do this by specifying an API Key when you make a call to the server. The [API Keys](../user/api-keys/) chapter of the RStudio Connect User Guide explains how to create an API Key.  <a id=\"api-keys\"></a> ## API Keys  API Keys are managed by each user in the RStudio Connect dashboard. If you ever lose an API Key or otherwise feel it has been compromised, use the dashboard to revoke the key and create another one.  **WARNING**: Keep your API Key safe.  If your RStudio Connect server\'s URL does not begin with `https`, your API Key could be intercepted and used by a malicious actor.  Once you have an API Key, you can authenticate by passing the key with a prefix of `\"Key \"` (the space is important) in the Authorization header.  Below are examples of invoking the \"Get R Information\" endpoint.  **cURL** ```bash curl -H \"Authorization: Key XXXXXXXXXXX\" \\      https://rstudioconnect.example.com/__api__/v1/server_settings/r ```  **R** ```r library(httr) apiKey <- \"XXXXXXXXXXX\" result <- GET(\"https://rstudioconnect.example.com/__api__/v1/server_settings/r\",   add_headers(Authorization = paste(\"Key\", apiKey))) ```  **Python** ```python import requests r = requests.get(   \'https://rstudioconnect.example.com/__api__/v1/server_settings/r\',   headers = { \'Authorization\': \'Key XXXXXXXXXXX\' } ) ```  <a id=\"API-Error-Codes\"></a> # API Error Codes  <table> <thead> <tr><th>Error&nbsp;Code</th><th>Message</th><th>HTTP status</th><th>HTTP message</th></tr> </thead> <tbody> <tr><td>1</td><td>An internal failure occurred.</td><td>500</td><td>Internal Server Error</td></tr> <tr><td>2</td><td>The requested method or endpoint is not supported.</td><td>404</td><td>Not Found</td></tr> <tr><td>3</td><td>The requested object ID is invalid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>4</td><td>The requested object does not exist.</td><td>404</td><td>Not Found</td></tr> <tr><td>5</td><td>Application name must be between 3 and 64 alphanumeric characters, dashes, and underscores.</td><td>400</td><td>Bad Request</td></tr> <tr><td>6</td><td>The password is not strong enough. Please try again.</td><td>400</td><td>Bad Request</td></tr> <tr><td>7</td><td>The requested username is not permitted.</td><td>400</td><td>Bad Request</td></tr> <tr><td>8</td><td>The requested username is already in use.</td><td>409</td><td>Conflict</td></tr> <tr><td>9</td><td>The requested user could not be found.</td><td>404</td><td>Not Found</td></tr> <tr><td>10</td><td>The requested object doesn&#39;t belong to you.</td><td>403</td><td>Forbidden</td></tr> <tr><td>11</td><td>The requested filter could not be applied.</td><td>400</td><td>Bad Request</td></tr> <tr><td>12</td><td>A required parameter is missing.</td><td>400</td><td>Bad Request</td></tr> <tr><td>13</td><td>The requested range is invalid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>14</td><td>Group name must be between 3 and 64 alphanumeric characters.</td><td>400</td><td>Bad Request</td></tr> <tr><td>15</td><td>The requested group name is already in use.</td><td>409</td><td>Conflict</td></tr> <tr><td>16</td><td>The user is already a member of the group.</td><td>409</td><td>Conflict</td></tr> <tr><td>17</td><td>The requested item could not be removed because it does not exist.</td><td>404</td><td>Not Found</td></tr> <tr><td>18</td><td>The requested item could not be changed because it does not exist.</td><td>404</td><td>Not Found</td></tr> <tr><td>19</td><td>You don&#39;t have permission to access this item.</td><td>403</td><td>Forbidden</td></tr> <tr><td>20</td><td>You don&#39;t have permission to remove this item.</td><td>403</td><td>Forbidden</td></tr> <tr><td>21</td><td>You don&#39;t have permission to change this item.</td><td>403</td><td>Forbidden</td></tr> <tr><td>22</td><td>You don&#39;t have permission to perform this operation.</td><td>403</td><td>Forbidden</td></tr> <tr><td>23</td><td>You don&#39;t have permission to give the user this role.</td><td>403</td><td>Forbidden</td></tr> <tr><td>24</td><td>The requested operation requires authentication.</td><td>401</td><td>Unauthorized</td></tr> <tr><td>25</td><td>The parameter is invalid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>26</td><td>An object with that name already exists.</td><td>409</td><td>Conflict</td></tr> <tr><td>27</td><td>This version of R is in use and cannot be deleted.</td><td>409</td><td>Conflict</td></tr> <tr><td>28</td><td>No application bundle to deploy.</td><td>404</td><td>Not Found</td></tr> <tr><td>29</td><td>The token is expired. Authentication tokens must be claimed within one hour.</td><td>401</td><td>Unauthorized</td></tr> <tr><td>30</td><td>We couldn&#39;t log you in with the provided credentials. Please ask your RStudio Connect administrator for assistance.</td><td>401</td><td>Unauthorized</td></tr> <tr><td>31</td><td>Password change prohibited.</td><td>403</td><td>Forbidden</td></tr> <tr><td>32</td><td>The requested filter is not valid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>33</td><td>This user cannot be added as a collaborator because they don&#39;t have permission to publish content.</td><td>403</td><td>Forbidden</td></tr> <tr><td>34</td><td>The application&#39;s owner cannot be added as a collaborator or viewer.</td><td>400</td><td>Bad Request</td></tr> <tr><td>35</td><td>Cannot delete object as it is being used elsewhere.</td><td>409</td><td>Conflict</td></tr> <tr><td>36</td><td>This user&#39;s username has already been set and cannot be changed.</td><td>400</td><td>Bad Request</td></tr> <tr><td>37</td><td>Schedules must have a start time and it must be after 1/1/2010.</td><td>400</td><td>Bad Request</td></tr> <tr><td>38</td><td>The application&#39;s manifest is invalid or missing.</td><td>400</td><td>Bad Request</td></tr> <tr><td>39</td><td>The application does not support this action.</td><td>400</td><td>Bad Request</td></tr> <tr><td>40</td><td>The current user has not been confirmed.</td><td>400</td><td>Bad Request</td></tr> <tr><td>41</td><td>The initial user must specify a password; it cannot be generated.</td><td>400</td><td>Bad Request</td></tr> <tr><td>42</td><td>The user has already been confirmed.</td><td>400</td><td>Bad Request</td></tr> <tr><td>43</td><td>This system has not been configured to send email. Please contact your RStudio Connect administrator.</td><td>400</td><td>Bad Request</td></tr> <tr><td>44</td><td>The current user does not have an email address.</td><td>400</td><td>Bad Request</td></tr> <tr><td>45</td><td>Invalid MinProcesses setting. The MinProcesses setting may not exceed the Scheduler.MinProcessesLimit setting.</td><td>400</td><td>Bad Request</td></tr> <tr><td>46</td><td>Internal user fields cannot be changed via API.</td><td>400</td><td>Bad Request</td></tr> <tr><td>47</td><td>Creation of new users is disabled.</td><td>403</td><td>Forbidden</td></tr> <tr><td>48</td><td>You cannot change the type of application once deployed. Try deploying this as a new application instead of updating an existing one.</td><td>403</td><td>Forbidden</td></tr> <tr><td>49</td><td>You don&#39;t have permission to lock/unlock this user.</td><td>403</td><td>Forbidden</td></tr> <tr><td>50</td><td>This user is locked.</td><td>403</td><td>Forbidden</td></tr> <tr><td>51</td><td>Vanity path conflicts with one or more already in use.</td><td>409</td><td>Conflict</td></tr> <tr><td>52</td><td>Vanity path is not permitted.</td><td>400</td><td>Bad Request</td></tr> <tr><td>53</td><td>Immutable field cannot be changed.</td><td>400</td><td>Bad Request</td></tr> <tr><td>54</td><td>You cannot set this content to run as the current user</td><td>400</td><td>Bad Request</td></tr> <tr><td>55</td><td>Custom RunAs settings are prohibited for static content.</td><td>400</td><td>Bad Request</td></tr> <tr><td>56</td><td>The RunAs setting references a prohibited Unix account.</td><td>400</td><td>Bad Request</td></tr> <tr><td>57</td><td>The RunAs setting does not reference a valid Unix account.</td><td>400</td><td>Bad Request</td></tr> <tr><td>58</td><td>The RunAs setting references a Unix account that does not have the correct group membership.</td><td>400</td><td>Bad Request</td></tr> <tr><td>59</td><td>There is no rendering available.</td><td>400</td><td>Bad Request</td></tr> <tr><td>60</td><td>This email address is not allowed to login to this server.</td><td>400</td><td>Bad Request</td></tr> <tr><td>61</td><td>You cannot change the role of the only remaining administrator.</td><td>400</td><td>Bad Request</td></tr> <tr><td>62</td><td>An API key name must not be blank.</td><td>400</td><td>Bad Request</td></tr> <tr><td>63</td><td>There was a problem communicating with the LDAP authentication server. Please contact your RStudio Connect administrator.</td><td>400</td><td>Bad Request</td></tr> <tr><td>64</td><td>The number of users permitted by this license has been exceeded. Please contact your administrator.</td><td>400</td><td>Bad Request</td></tr> <tr><td>65</td><td>API applications are not permitted by your license.</td><td>403</td><td>Forbidden</td></tr> <tr><td>66</td><td>You cannot assign ownership to another user.</td><td>400</td><td>Bad Request</td></tr> <tr><td>67</td><td>You must provide the source_key for an existing variant</td><td>400</td><td>Bad Request</td></tr> <tr><td>68</td><td>You cannot promote a variant without a valid rendering</td><td>400</td><td>Bad Request</td></tr> <tr><td>69</td><td>The bundle ID of the source and target variants must match</td><td>400</td><td>Bad Request</td></tr> <tr><td>70</td><td>Target rendering is more recent than source rendering</td><td>400</td><td>Bad Request</td></tr> <tr><td>71</td><td>Only parameterized documents support promoting output</td><td>400</td><td>Bad Request</td></tr> <tr><td>72</td><td>Not allowed to create schedule with different application association than its variant</td><td>400</td><td>Bad Request</td></tr> <tr><td>73</td><td>You may not schedule ad-hoc variants</td><td>400</td><td>Bad Request</td></tr> <tr><td>74</td><td>The requested report name is not permitted</td><td>400</td><td>Bad Request</td></tr> <tr><td>75</td><td>You may not delete the active bundle for an application</td><td>400</td><td>Bad Request</td></tr> <tr><td>76</td><td>A user using the same Unique ID already exists</td><td>400</td><td>Bad Request</td></tr> <tr><td>77</td><td>A tag name cannot be more than 255 characters</td><td>400</td><td>Bad Request</td></tr> <tr><td>78</td><td>A tag must have a name</td><td>400</td><td>Bad Request</td></tr> <tr><td>79</td><td>Cannot assign a category to an app</td><td>400</td><td>Bad Request</td></tr> <tr><td>80</td><td>The target object does not match the provided version.</td><td>409</td><td>Conflict</td></tr> <tr><td>81</td><td>Duplicate names are not permitted; a sibling tag or category already has this name</td><td>400</td><td>Bad Request</td></tr> <tr><td>82</td><td>The bundle for deployment must belong to the target application.</td><td>400</td><td>Bad Request</td></tr> <tr><td>83</td><td>Too many search results. Be more specific.</td><td>400</td><td>Bad Request</td></tr> <tr><td>84</td><td>The token has already been claimed. Tokens can only be claimed once.</td><td>403</td><td>Forbidden</td></tr> <tr><td>85</td><td>A token using the same token key already exists</td><td>400</td><td>Bad Request</td></tr> <tr><td>86</td><td>A new token MUST contain a public_key and token in the json body.</td><td>400</td><td>Bad Request</td></tr> <tr><td>87</td><td>The request body cannot be parsed</td><td>400</td><td>Bad Request</td></tr> <tr><td>88</td><td>Cannot apply the requested change because it would make the target object an ancestor of itself.</td><td>400</td><td>Bad Request</td></tr> <tr><td>89</td><td>Unable to send email. Please contact your RStudio Connect administrator.</td><td>400</td><td>Bad Request</td></tr> <tr><td>90</td><td>User self-registration is disabled</td><td>400</td><td>Bad Request</td></tr> <tr><td>91</td><td>The external authentication provider did not provide a valid username.</td><td>400</td><td>Bad Request</td></tr> <tr><td>92</td><td>XSRF token mismatch</td><td>403</td><td>Forbidden</td></tr> <tr><td>93</td><td>Private variants cannot be configured to email users other than the owner</td><td>403</td><td>Forbidden</td></tr> <tr><td>94</td><td>You can only request a permissions upgrade once per 24-hour period.</td><td>400</td><td>Bad Request</td></tr> <tr><td>95</td><td>This API does not allow the current authentication type.</td><td>403</td><td>Forbidden</td></tr> <tr><td>96</td><td>Incorrect current password.</td><td>403</td><td>Forbidden</td></tr> <tr><td>97</td><td>Changing host or scheme in redirect is forbidden.</td><td>403</td><td>Forbidden</td></tr> <tr><td>98</td><td>We couldn&#39;t log you in with the provided credentials. Please ask your RStudio Connect administrator for assistance.</td><td>401</td><td>Unauthorized</td></tr> <tr><td>99</td><td>Please re-supply your credentials.</td><td>401</td><td>Unauthorized</td></tr> <tr><td>100</td><td>Unable to remove item. It is being processed.</td><td>400</td><td>Bad Request</td></tr> <tr><td>101</td><td>The provided password change token is invalid.</td><td>403</td><td>Forbidden</td></tr> <tr><td>102</td><td>A schedule for this variant already exists.</td><td>409</td><td>Conflict</td></tr> <tr><td>103</td><td>This system has not been configured to send email. Please contact your RStudio Connect administrator.</td><td>400</td><td>Bad Request</td></tr> <tr><td>104</td><td>The content checksum header and body MD5 sum are not equal.</td><td>400</td><td>Bad Request</td></tr> <tr><td>105</td><td>TensorFlow Model APIs are not permitted by your license.</td><td>403</td><td>Forbidden</td></tr> <tr><td>106</td><td>Unable to update environment variables because they were changed while you were editing them.</td><td>409</td><td>Conflict</td></tr> <tr><td>107</td><td>That username is not allowed because it is prohibited by policy.</td><td>400</td><td>Bad Request</td></tr> <tr><td>108</td><td>Environment changes contain a prohibited variable</td><td>409</td><td>Conflict</td></tr> <tr><td>109</td><td>This type of content is not allowed because it is prohibited by policy.</td><td>403</td><td>Forbidden</td></tr> <tr><td>110</td><td>You cannot change the categorization of content once deployed. Try deploying this as a new application instead of updating an existing one.</td><td>403</td><td>Forbidden</td></tr> <tr><td>111</td><td>You cannot change if an app is parameterized once deployed. Try deploying this as a new application instead of updating an existing one.</td><td>403</td><td>Forbidden</td></tr> <tr><td>112</td><td>The provided user role is not recognized.</td><td>400</td><td>Bad Request</td></tr> <tr><td>113</td><td>Invalid MaxProcesses setting. The MaxProcesses setting may not exceed the Scheduler.MaxProcessesLimit setting.</td><td>400</td><td>Bad Request</td></tr> <tr><td>114</td><td>Invalid MinProcesses setting. The MinProcesses setting may not exceed the MaxProcesses setting.</td><td>400</td><td>Bad Request</td></tr> <tr><td>115</td><td>The provided status is not recognized.</td><td>400</td><td>Bad Request</td></tr> <tr><td>116</td><td>The requested rendering does not match the variant.</td><td>400</td><td>Bad Request</td></tr> <tr><td>117</td><td>Unknown access type.</td><td>400</td><td>Bad Request</td></tr> <tr><td>118</td><td>This access type is not allowed because it is prohibited by policy.</td><td>403</td><td>Forbidden</td></tr> <tr><td>119</td><td>The authentication provider does not support creating records from a retrieved ticket. POST new content instead.</td><td>400</td><td>Bad Request</td></tr> <tr><td>120</td><td>The authentication provider does not support creating records from POST content. PUT a retrieved ticket instead.</td><td>400</td><td>Bad Request</td></tr> <tr><td>121</td><td>The request JSON is invalid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>122</td><td>Application title must be between 3 and 1024 characters.</td><td>400</td><td>Bad Request</td></tr> <tr><td>123</td><td>Application description must be 4096 characters or less.</td><td>400</td><td>Bad Request</td></tr> <tr><td>124</td><td>No administrator has a configured email address.</td><td>400</td><td>Bad Request</td></tr> <tr><td>125</td><td>Content-Length cannot be 0.</td><td>400</td><td>Bad Request</td></tr> <tr><td>126</td><td>Request Content-Length did not match the number of bytes received.</td><td>400</td><td>Bad Request</td></tr> <tr><td>127</td><td>The temp_ticket is invalid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>128</td><td>The email address cannot be blank.</td><td>400</td><td>Bad Request</td></tr> <tr><td>129</td><td>The user unique ID cannot be blank.</td><td>400</td><td>Bad Request</td></tr> <tr><td>130</td><td>The group unique ID cannot be blank.</td><td>400</td><td>Bad Request</td></tr> <tr><td>131</td><td>A group using the same unique ID already exists.</td><td>400</td><td>Bad Request</td></tr> <tr><td>132</td><td>The configured provider cannot access this endpoint.</td><td>400</td><td>Bad Request</td></tr> <tr><td>133</td><td>The source variant belongs to a different app.</td><td>400</td><td>Bad Request</td></tr> <tr><td>134</td><td>Unable to write bundle to disk.</td><td>400</td><td>Bad Request</td></tr> <tr><td>135</td><td>Unable to extract the bundle.</td><td>400</td><td>Bad Request</td></tr> <tr><td>136</td><td>Time values must be in RFC3339 format.</td><td>400</td><td>Bad Request</td></tr> <tr><td>137</td><td>The start of the time interval cannot be in the past, or more than 5 years in the future.</td><td>400</td><td>Bad Request</td></tr> <tr><td>138</td><td>The end of the time interval cannot be earlier than the start time.</td><td>400</td><td>Bad Request</td></tr> <tr><td>139</td><td>The length of the time interval cannot be more than 1 year.</td><td>400</td><td>Bad Request</td></tr> <tr><td>140</td><td>The time interval must have both start and end times.</td><td>400</td><td>Bad Request</td></tr> <tr><td>141</td><td>Task lookup failures can indicate that a load balancer is not using sticky sessions or a client is not including the session cookie. Details: https://docs.rstudio.com/connect/admin/load-balancing/</td><td>404</td><td>Not Found</td></tr> <tr><td>142</td><td>The app is already managed by git.</td><td>409</td><td>Conflict</td></tr> <tr><td>143</td><td>The app is not managed by git.</td><td>409</td><td>Conflict</td></tr> <tr><td>144</td><td>Uploading a content bundle is not allowed for this application since it is managed by git.</td><td>409</td><td>Conflict</td></tr> <tr><td>145</td><td>Cannot deploy this content because git is not enabled.</td><td>400</td><td>Bad Request</td></tr> <tr><td>146</td><td>Git urls with usernames are not supported.</td><td>400</td><td>Bad Request</td></tr> <tr><td>147</td><td>The specified app mode does not use worker processes.</td><td>400</td><td>Bad Request</td></tr> <tr><td>148</td><td>The specified app mode is not valid.</td><td>400</td><td>Bad Request</td></tr> <tr><td>149</td><td>Environment changes contain a duplicated variable name.</td><td>409</td><td>Conflict</td></tr> <tr><td>150</td><td>The load factor must be between 0.0 and 1.0.</td><td>400</td><td>Bad Request</td></tr> <tr><td>151</td><td>The timeout must be between 0 and 2592000 seconds.</td><td>400</td><td>Bad Request</td></tr> <tr><td>152</td><td>The principal type must be &#39;user&#39; or &#39;group&#39;.</td><td>400</td><td>Bad Request</td></tr> <tr><td>153</td><td>The requested group could not be found.</td><td>404</td><td>Not Found</td></tr> <tr><td>154</td><td>The requested user is already in the content permission list.</td><td>409</td><td>Conflict</td></tr> <tr><td>155</td><td>The requested group is already in the content permission list.</td><td>409</td><td>Conflict</td></tr> <tr><td>156</td><td>This user cannot be assigned as the owner because they don&#39;t have permission to publish content.</td><td>403</td><td>Forbidden</td></tr> <tr><td>157</td><td>The requested parent tag does not exist</td><td>400</td><td>Bad Request</td></tr> <tr><td>158</td><td>The requested tag does not exist</td><td>400</td><td>Bad Request</td></tr> </tbody> </table>   Copyright &copy; 2020 by RStudio, PBC.
 *
 * The version of the OpenAPI document: 1.8.6rc-6
 * Contact: support@rstudio.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * This object defines data returned in the case of an error. The [API error codes](#API-Error-Codes) reference enumerates all values for `code`. The response `error` message can vary from the default message to provide additional details about the error.
 * @export
 * @interface APIError
 */
export interface APIError {
    /**
     * The specific code for the type of error returned.
     * @type {number}
     * @memberof APIError
     */
    code: number;
    /**
     * Some text which describes the problem that was encountered.
     * @type {string}
     * @memberof APIError
     */
    error: string;
    /**
     * 
     * @type {object}
     * @memberof APIError
     */
    payload?: object | null;
}
/**
 * 
 * @export
 * @interface AuditEntry
 */
export interface AuditEntry {
    /**
     * Audit action taken
     * @type {string}
     * @memberof AuditEntry
     */
    action: string;
    /**
     * Description of action
     * @type {string}
     * @memberof AuditEntry
     */
    event_description: string;
    /**
     * ID of the audit action
     * @type {string}
     * @memberof AuditEntry
     */
    id: string;
    /**
     * Timestamp in [RFC3339](https://tools.ietf.org/html/rfc3339) format when action was taken
     * @type {string}
     * @memberof AuditEntry
     */
    time: string;
    /**
     * Description of the actor
     * @type {string}
     * @memberof AuditEntry
     */
    user_description: string;
    /**
     * User ID of the actor who made the audit action
     * @type {string}
     * @memberof AuditEntry
     */
    user_id: string;
}
/**
 * 
 * @export
 * @interface AuditLogs
 */
export interface AuditLogs {
    /**
     * 
     * @type {AuditPager}
     * @memberof AuditLogs
     */
    paging?: AuditPager;
    /**
     * The audit logs
     * @type {Array<AuditEntry>}
     * @memberof AuditLogs
     */
    results?: Array<AuditEntry>;
}
/**
 * Paging object that can be used for navigation
 * @export
 * @interface AuditPager
 */
export interface AuditPager {
    /**
     * 
     * @type {AuditPagerCursors}
     * @memberof AuditPager
     */
    cursors: AuditPagerCursors;
    /**
     * A full URL of the first page of results.  It will be `null` if the current response represents the first page of results.
     * @type {string}
     * @memberof AuditPager
     */
    first: string | null;
    /**
     * A full URL of the last page of results.  It will be `null` if the current response represents the last page of results.
     * @type {string}
     * @memberof AuditPager
     */
    last: string | null;
    /**
     * A full URL of the next page of results when the current request was made.  It will be `null` if the current response represents the last page of results.
     * @type {string}
     * @memberof AuditPager
     */
    next: string | null;
    /**
     * A full URL of the previous page of results when the curent request was made.  It will be `null` if the current response represents the first page of results.
     * @type {string}
     * @memberof AuditPager
     */
    previous: string | null;
}
/**
 * Cursors that can be used for navigation
 * @export
 * @interface AuditPagerCursors
 */
export interface AuditPagerCursors {
    /**
     * A cursor ID that can be used with the `next` query param to get the next page of results.
     * @type {string}
     * @memberof AuditPagerCursors
     */
    next: string | null;
    /**
     * A cursor ID that can be used with the `previous` query param to get the previous page of results.
     * @type {string}
     * @memberof AuditPagerCursors
     */
    previous: string | null;
}
/**
 * Content published to RStudio Connect is encapsulated in a \"bundle\" that contains the source code and data necessary to execute the content. An application or report is updated by uploading a new bundle.
 * @export
 * @interface Bundle
 */
export interface Bundle {
    /**
     * Indicates if this bundle is active for the owning content.
     * @type {boolean}
     * @memberof Bundle
     */
    active?: boolean;
    /**
     * The identifier of the owning content.
     * @type {string}
     * @memberof Bundle
     */
    content_guid?: string;
    /**
     * The timestamp (RFC3339) of when this bundle was created.
     * @type {string}
     * @memberof Bundle
     */
    created_time?: string;
    /**
     * The identifier for this bundle.
     * @type {string}
     * @memberof Bundle
     */
    id?: string;
    /**
     * The version of the Python interpreter used when last restoring this bundle.  The value `null` represents that a Python interpreter is not used by this bundle or that the Python package environment has not been successfully restored.  Python version is not disclosed to users with a \"viewer\" role and returned with the value `null`.
     * @type {string}
     * @memberof Bundle
     */
    py_version?: string | null;
    /**
     * The version of the R interpreter used when last restoring this bundle. The value `null` represents that an R interpreter is not used by this bundle or that the R package environment has not been successfully restored.  R version is not disclosed to users with a \"viewer\" role and returned with the value `null`.
     * @type {string}
     * @memberof Bundle
     */
    r_version?: string | null;
    /**
     * On-disk size in bytes of the tar.gz file associated with this bundle. Zero when there is no on-disk file.
     * @type {number}
     * @memberof Bundle
     */
    size?: number;
}
/**
 * Content published to RStudio Connect is encapsulated in a \"bundle\" that contains the source code and data necessary to execute the content. An application or report is updated by uploading a new bundle.
 * @export
 * @interface BundleV1Exp
 */
export interface BundleV1Exp {
    /**
     * Indicates if this bundle is active for the owning content.
     * @type {boolean}
     * @memberof BundleV1Exp
     */
    active?: boolean;
    /**
     * The identifier of the owning content.
     * @type {string}
     * @memberof BundleV1Exp
     */
    content_guid?: string;
    /**
     * The timestamp (RFC3339) of when this bundle was created.
     * @type {string}
     * @memberof BundleV1Exp
     */
    created_time?: string;
    /**
     * The identifier for this bundle.
     * @type {string}
     * @memberof BundleV1Exp
     */
    id?: string;
    /**
     * The version of the Python interpreter used when last restoring this bundle.  The value `null` represents that a Python interpreter is not used by this bundle or that the Python package environment has not been successfully restored.  Python version is not disclosed to users with a \"viewer\" role and returned with the value `null`.
     * @type {string}
     * @memberof BundleV1Exp
     */
    py_version?: string | null;
    /**
     * The version of the R interpreter used when last restoring this bundle. The value `null` represents that an R interpreter is not used by this bundle or that the R package environment has not been successfully restored.  R version is not disclosed to users with a \"viewer\" role and returned with the value `null`.
     * @type {string}
     * @memberof BundleV1Exp
     */
    r_version?: string | null;
    /**
     * On-disk size in bytes of the tar.gz file associated with this bundle. Zero when there is no on-disk file.
     * @type {number}
     * @memberof BundleV1Exp
     */
    size?: number;
}
/**
 * 
 * @export
 * @interface BundlesV1Exp
 */
export interface BundlesV1Exp {
    /**
     * The current page of results.
     * @type {number}
     * @memberof BundlesV1Exp
     */
    current_page?: number;
    /**
     * The bundles list
     * @type {Array<BundleV1Exp>}
     * @memberof BundlesV1Exp
     */
    results?: Array<BundleV1Exp>;
    /**
     * The total number of bundles that belong to the given content.
     * @type {number}
     * @memberof BundlesV1Exp
     */
    total?: number;
}
/**
 * The content object models all the \"things\" you may deploy to RStudio Connect. This includes Shiny applications, R Markdown documents, Jupyter notebooks, Plumber APIs, Flask APIs, Python apps, TensorFlow Model APIs, plots, and pins.  The `app_mode` field specifies the type of content represented by this item and defines its runtime model.  * Active content, such as apps and APIs, executes on demand as requests arrive. * Reports, such as R Markdown documents and Jupyter notebooks, render from source to output HTML. This rendering can occur based on a schedule or when explicitly triggered. It is *not* on each visit. Viewers of this type of content see a previously rendered result. * Static content is presented to viewers in its deployed form.  The fields `bundle_id`, `app_mode`, `content_category`, `parameterized`, `r_version`, and `py_version` are computed as a consequence of a <a href=\"#post-/v1/content/{guid}/deploy\" onclick=\"linkClick\">POST /v1/content/{guid}/deploy</a> deployment operation.  The `run_as` and `run_as_current_user` fields are read-only as fields of Content objects. A future API will allow adjustment of these properties. Use the RStudio Connect dashboard to adjust what Unix user executes your content.
 * @export
 * @interface Content
 */
export interface Content {
    /**
     * Access type describes how this content manages its viewers. The value `all` is the most permissive; any visitor to RStudio Connect will be able to view this content. The value `logged_in` indicates that all RStudio Connect accounts may view the content. The `acl` value lets specifically enumerated users and groups view the content. Users configured as collaborators may always view content.
     * @type {string}
     * @memberof Content
     */
    access_type?: ContentAccessTypeEnum;
    /**
     * The runtime model for this content. Has a value of `unknown` before data is deployed to this item. Automatically assigned upon the first successful bundle deployment.  Valid values are:  * `api` - R code defining a [Plumber API](https://www.rplumber.io). * `jupyter-static` - A [Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/). * `python-api` - Python code defining an API (such as [Flask](https://palletsprojects.com/p/flask/)) * `python-bokeh` - Python code defining a [Bokeh application](https://bokeh.org/). * `python-dash` - Python code defining a [Dash application](https://dash.plot.ly/). * `python-streamlit` - Python code defining a [Streamlit application](https://streamlit.io/). * `rmd-shiny` - An [R Markdown](https://rmarkdown.rstudio.com) document with a Shiny runtime. * `rmd-static` - An [R Markdown](https://rmarkdown.rstudio.com) document or site. * `shiny` - R code defining a [Shiny application](https://shiny.rstudio.com). * `static` - Content deployed without source; often HTML and plots. * `tensorflow-saved-model` - A TensorFlow Model API. * `unknown` - No known runtime model.
     * @type {string}
     * @memberof Content
     */
    app_mode?: ContentAppModeEnum;
    /**
     * The identifier for the active deployment bundle. Automatically assigned upon the successful deployment of that bundle.
     * @type {string}
     * @memberof Content
     */
    bundle_id?: string | null;
    /**
     * Maximum number of seconds allowed without data sent or received across a client connection. A value of `0` means connections will never time-out (not recommended). When `null`, the default `Scheduler.ConnectionTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    connection_timeout?: number | null;
    /**
     * Describes the specialization of the content runtime model. Automatically assigned upon the first successful bundle deployment.  The `content_category` field refines the type of content specified by `app_mode`. It is empty by default. The `rsconnect` R package may assign a value when analyzing your content and building its manifest and bundle. Plots (images created in the RStudio IDE and presented in the \"Plots\" pane) have an `app_mode` of `static` and receive a `content_category` of `plot` to distinguish them from other HTML documents. Pinned static data sets have an `app_mode` of `static` and a `content_category` of `pin`. Multi-document R Markdown sites have an `app_mode` of `rmd-static` and a `content_category` of `site`.
     * @type {string}
     * @memberof Content
     */
    content_category?: string;
    /**
     * The URL associated with this content. Computed from the associated vanity URL or GUID for this content.
     * @type {string}
     * @memberof Content
     */
    content_url?: string;
    /**
     * The timestamp (RFC3339) indicating when this content was created.
     * @type {string}
     * @memberof Content
     */
    created_time?: string;
    /**
     * The URL within the Connect dashboard where this content can be configured. Computed from the GUID for this content.
     * @type {string}
     * @memberof Content
     */
    dashboard_url?: string;
    /**
     * A rich description of this content.
     * @type {string}
     * @memberof Content
     */
    description?: string;
    /**
     * The unique identifier of this content item.
     * @type {string}
     * @memberof Content
     */
    guid?: string;
    /**
     * The internal numeric identifier of this content item.
     * @type {string}
     * @memberof Content
     */
    id?: string;
    /**
     * The maximum number of seconds a worker process for an interactive application to remain alive after it goes idle (no active connections). When `null`, the default `Scheduler.IdleTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    idle_timeout?: number | null;
    /**
     * The maximum number of seconds allowed for an interactive application to start. RStudio Connect must be able to connect to a newly launched Shiny application, for example, before this threshold has elapsed. When `null`, the default `Scheduler.InitTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    init_timeout?: number | null;
    /**
     * The timestamp (RFC3339) indicating when this content last had a successful bundle deployment performed.
     * @type {string}
     * @memberof Content
     */
    last_deployed_time?: string;
    /**
     * Controls how aggressively new processes are spawned. When `null`, the default `Scheduler.LoadFactor` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    load_factor?: number | null;
    /**
     * Specifies the maximum number of client connections allowed to an individual process. Incoming connections which will exceed this limit are routed to a new process or rejected. When `null`, the default `Scheduler.MaxConnsPerProcess` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    max_conns_per_process?: number | null;
    /**
     * Specifies the total number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MaxProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    max_processes?: number | null;
    /**
     * Specifies the minimum number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MinProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    min_processes?: number | null;
    /**
     * A simple, URL-friendly identifier. Allows alpha-numeric characters, hyphens (`\"-\"`), and underscores (`\"_\"`).
     * @type {string}
     * @memberof Content
     */
    name?: string;
    /**
     * The unique identifier of the user who created this content item. Automatically assigned when the content is created.
     * @type {string}
     * @memberof Content
     */
    owner_guid?: string;
    /**
     * True when R Markdown rendered content allows parameter configuration. Automatically assigned upon the first successful bundle deployment. Applies only to content with an `app_mode` of `rmd-static`.
     * @type {boolean}
     * @memberof Content
     */
    parameterized?: boolean;
    /**
     * The version of the Python interpreter associated with this content. The value `null` represents that a Python interpreter is not used by this content or that the client does not have sufficient rights to see this information or that the Python package environment has not been successfully restored. Automatically assigned upon the successful deployment of a bundle.
     * @type {string}
     * @memberof Content
     */
    py_version?: string | null;
    /**
     * The version of the R interpreter associated with this content. The value `null` represents that an R interpreter is not used by this content or that the client does not have sufficient rights to see this information or that the R package environment has not been successfully restored. Automatically assigned upon the successful deployment of a bundle.
     * @type {string}
     * @memberof Content
     */
    r_version?: string | null;
    /**
     * Maximum number of seconds allowed without data received from a client connection. A value of `0` means a lack of client (browser) interaction never causes the connection to close. When `null`, the default `Scheduler.ReadTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof Content
     */
    read_timeout?: number | null;
    /**
     * The relationship of the accessing user to this content. A value of `owner` is returned for the content owner. `editor` indicates a collaborator. The `viewer` value is given to users who are permitted to view the content. A `none` role is returned for administrators who cannot view the content but are permitted to view its configuration. Computed at the time of the request.
     * @type {string}
     * @memberof Content
     */
    role?: ContentRoleEnum;
    /**
     * The UNIX user that executes this content. When `null`, the default `Applications.RunAs` is used. Applies only to executable content types - not `static`.
     * @type {string}
     * @memberof Content
     */
    run_as?: string | null;
    /**
     * Indicates if this content is allowed to execute as the logged-in user when using PAM authentication. Applies only to executable content types - not `static`.
     * @type {boolean}
     * @memberof Content
     */
    run_as_current_user?: boolean;
    /**
     * The title of this content.
     * @type {string}
     * @memberof Content
     */
    title?: string | null;
}

/**
    * @export
    * @enum {string}
    */
export enum ContentAccessTypeEnum {
    All = 'all',
    LoggedIn = 'logged_in',
    Acl = 'acl'
}
/**
    * @export
    * @enum {string}
    */
export enum ContentAppModeEnum {
    Api = 'api',
    JupyterStatic = 'jupyter-static',
    PythonApi = 'python-api',
    PythonBokeh = 'python-bokeh',
    PythonDash = 'python-dash',
    PythonStreamlit = 'python-streamlit',
    RmdShiny = 'rmd-shiny',
    RmdStatic = 'rmd-static',
    Shiny = 'shiny',
    Static = 'static',
    TensorflowSavedModel = 'tensorflow-saved-model',
    Unknown = 'unknown'
}
/**
    * @export
    * @enum {string}
    */
export enum ContentRoleEnum {
    Owner = 'owner',
    Editor = 'editor',
    Viewer = 'viewer',
    None = 'none'
}

/**
 * The content object models all the \"things\" you may deploy to RStudio Connect. This includes Shiny applications, R Markdown documents, Jupyter notebooks, Plumber APIs, Flask APIs, Python apps, TensorFlow Model APIs, plots, and pins.  The `app_mode` field specifies the type of content represented by this item and defines its runtime model.  * Active content, such as apps and APIs, executes on demand as requests arrive. * Reports, such as R Markdown documents and Jupyter notebooks, render from source to output HTML. This rendering can occur based on a schedule or when explicitly triggered. It is *not* on each visit. Viewers of this type of content see a previously rendered result. * Static content is presented to viewers in its deployed form.  The fields `bundle_id`, `app_mode`, `content_category`, `has_parameters`, `r_version`, and `py_version` are computed as a consequence of a  <a href=\"#post-/v1/experimental/content/{guid}/deploy\" onclick=\"linkClick\">POST /v1/experimental/content/{guid}/deploy</a> deployment operation.  The `run_as` and `run_as_current_user` fields are read-only as fields of Content objects. A future API will allow adjustment of these properties. Use the RStudio Connect dashboard to adjust what Unix user executes your content.
 * @export
 * @interface ContentV1Exp
 */
export interface ContentV1Exp {
    /**
     * Access type describes how this content manages its viewers. The value `all` is the most permissive; any visitor to RStudio Connect will be able to view this content. The value `logged_in` indicates that all RStudio Connect accounts may view the content. The `acl` value lets specifically enumerated users and groups view the content. Users configured as collaborators may always view content.
     * @type {string}
     * @memberof ContentV1Exp
     */
    access_type?: ContentV1ExpAccessTypeEnum;
    /**
     * The runtime model for this content. Has a value of `unknown` before data is deployed to this item. Automatically assigned upon the first successful bundle deployment.  Valid values are:  * `api` - R code defining a [Plumber API](https://www.rplumber.io). * `jupyter-static` - A [Jupyter Notebook](https://jupyter-notebook.readthedocs.io/en/stable/). * `python-api` - Python code defining an API (such as [Flask](https://palletsprojects.com/p/flask/)) * `python-bokeh` - Python code defining a [Bokeh application](https://bokeh.org/). * `python-dash` - Python code defining a [Dash application](https://dash.plot.ly/). * `python-streamlit` - Python code defining a [Streamlit application](https://streamlit.io/). * `rmd-shiny` - An [R Markdown](https://rmarkdown.rstudio.com) document with a Shiny runtime. * `rmd-static` - An [R Markdown](https://rmarkdown.rstudio.com) document or site. * `shiny` - R code defining a [Shiny application](https://shiny.rstudio.com). * `static` - Content deployed without source; often HTML and plots. * `tensorflow-saved-model` - A TensorFlow Model API. * `unknown` - No known runtime model.
     * @type {string}
     * @memberof ContentV1Exp
     */
    app_mode?: ContentV1ExpAppModeEnum;
    /**
     * The identifier for the active deployment bundle. Automatically assigned upon the successful deployment of that bundle.
     * @type {string}
     * @memberof ContentV1Exp
     */
    bundle_id?: string | null;
    /**
     * Maximum number of seconds allowed without data sent or received across a client connection. A value of `0` means connections will never time-out (not recommended). When `null`, the default `Scheduler.ConnectionTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    connection_timeout?: number | null;
    /**
     * Describes the specialization of the content runtime model. Automatically assigned upon the first successful bundle deployment.  The `content_category` field refines the type of content specified by `app_mode`. It is empty by default. The `rsconnect` R package may assign a value when analyzing your content and building its manifest and bundle. Plots (images created in the RStudio IDE and presented in the \"Plots\" pane) have an `app_mode` of `static` and receive a `content_category` of `plot` to distinguish them from other HTML documents. Pinned static data sets have an `app_mode` of `static` and a `content_category` of `pin`. Multi-document R Markdown sites have an `app_mode` of `rmd-static` and a `content_category` of `site`.
     * @type {string}
     * @memberof ContentV1Exp
     */
    content_category?: string;
    /**
     * The timestamp (RFC3339) indicating when this content was created.
     * @type {string}
     * @memberof ContentV1Exp
     */
    created_time?: string;
    /**
     * A rich description of this content.
     * @type {string}
     * @memberof ContentV1Exp
     */
    description?: string;
    /**
     * The unique identifier of this content item.
     * @type {string}
     * @memberof ContentV1Exp
     */
    guid?: string;
    /**
     * True when R Markdown rendered content allows parameter configuration. Automatically assigned upon the first successful bundle deployment. Applies only to content with an `app_mode` of `rmd-static`.
     * @type {boolean}
     * @memberof ContentV1Exp
     */
    has_parameters?: boolean;
    /**
     * The maximum number of seconds a worker process for an interactive application to remain alive after it goes idle (no active connections). When `null`, the default `Scheduler.IdleTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    idle_timeout?: number | null;
    /**
     * The maximum number of seconds allowed for an interactive application to start. RStudio Connect must be able to connect to a newly launched Shiny application, for example, before this threshold has elapsed. When `null`, the default `Scheduler.InitTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    init_timeout?: number | null;
    /**
     * The timestamp (RFC3339) indicating when this content last had a successful bundle deployment performed.
     * @type {string}
     * @memberof ContentV1Exp
     */
    last_deployed_time?: string;
    /**
     * Controls how aggressively new processes are spawned. When `null`, the default `Scheduler.LoadFactor` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    load_factor?: number | null;
    /**
     * Specifies the maximum number of client connections allowed to an individual process. Incoming connections which will exceed this limit are routed to a new process or rejected. When `null`, the default `Scheduler.MaxConnsPerProcess` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    max_conns_per_process?: number | null;
    /**
     * Specifies the total number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MaxProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    max_processes?: number | null;
    /**
     * Specifies the minimum number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MinProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    min_processes?: number | null;
    /**
     * A simple, URL-friendly identifier. Allows alpha-numeric characters, hyphens (`\"-\"`), and underscores (`\"_\"`).
     * @type {string}
     * @memberof ContentV1Exp
     */
    name?: string;
    /**
     * The unique identifier of the user who created this content item. Automatically assigned when the content is created.
     * @type {string}
     * @memberof ContentV1Exp
     */
    owner_guid?: string;
    /**
     * The version of the Python interpreter associated with this content. The value `null` represents that a Python interpreter is not used by this content or that the client does not have sufficient rights to see this information or that the Python package environment has not been successfully restored. Automatically assigned upon the successful deployment of a bundle.
     * @type {string}
     * @memberof ContentV1Exp
     */
    py_version?: string | null;
    /**
     * The version of the R interpreter associated with this content. The value `null` represents that an R interpreter is not used by this content or that the client does not have sufficient rights to see this information or that the R package environment has not been successfully restored. Automatically assigned upon the successful deployment of a bundle.
     * @type {string}
     * @memberof ContentV1Exp
     */
    r_version?: string | null;
    /**
     * Maximum number of seconds allowed without data received from a client connection. A value of `0` means a lack of client (browser) interaction never causes the connection to close. When `null`, the default `Scheduler.ReadTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof ContentV1Exp
     */
    read_timeout?: number | null;
    /**
     * The relationship of the accessing user to this content. A value of `owner` is returned for the content owner. `editor` indicates a collaborator. The `viewer` value is given to users who are permitted to view the content. A `none` role is returned for administrators who cannot view the content but are permitted to view its configuration. Computed at the time of the request.
     * @type {string}
     * @memberof ContentV1Exp
     */
    role?: ContentV1ExpRoleEnum;
    /**
     * The UNIX user that executes this content. When `null`, the default `Applications.RunAs` is used. Applies only to executable content types - not `static`.
     * @type {string}
     * @memberof ContentV1Exp
     */
    run_as?: string | null;
    /**
     * Indicates if this content is allowed to execute as the logged-in user when using PAM authentication. Applies only to executable content types - not `static`.
     * @type {boolean}
     * @memberof ContentV1Exp
     */
    run_as_current_user?: boolean;
    /**
     * The title of this content.
     * @type {string}
     * @memberof ContentV1Exp
     */
    title?: string | null;
    /**
     * The URL associated with this content. Computed from the associated vanity URL or the identifiers for this content.
     * @type {string}
     * @memberof ContentV1Exp
     */
    url?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum ContentV1ExpAccessTypeEnum {
    All = 'all',
    LoggedIn = 'logged_in',
    Acl = 'acl'
}
/**
    * @export
    * @enum {string}
    */
export enum ContentV1ExpAppModeEnum {
    Api = 'api',
    JupyterStatic = 'jupyter-static',
    PythonApi = 'python-api',
    PythonBokeh = 'python-bokeh',
    PythonDash = 'python-dash',
    PythonStreamlit = 'python-streamlit',
    RmdShiny = 'rmd-shiny',
    RmdStatic = 'rmd-static',
    Shiny = 'shiny',
    Static = 'static',
    TensorflowSavedModel = 'tensorflow-saved-model',
    Unknown = 'unknown'
}
/**
    * @export
    * @enum {string}
    */
export enum ContentV1ExpRoleEnum {
    Owner = 'owner',
    Editor = 'editor',
    Viewer = 'viewer',
    None = 'none'
}

/**
 * 
 * @export
 * @interface ContentVisit
 */
export interface ContentVisit {
    /**
     * The ID of the particular bundle used.
     * @type {number}
     * @memberof ContentVisit
     */
    bundle_id: number;
    /**
     * The GUID, in [RFC4122](https://tools.ietf.org/html/rfc4122) format, of the content this information pertains to.
     * @type {string}
     * @memberof ContentVisit
     */
    content_guid: string;
    /**
     * The data version the record was recorded with.  The [Content Visit Events](../admin/historical-information/#content-visit-events) section of the RStudio Connect Admin Guide explains how to interpret `data_version` values.
     * @type {number}
     * @memberof ContentVisit
     */
    data_version: number;
    /**
     * The ID of the rendering the user visited.  This will be `null` for static content.
     * @type {number}
     * @memberof ContentVisit
     */
    rendering_id?: number;
    /**
     * The timestamp, in [RFC3339](https://tools.ietf.org/html/rfc3339) format, when the user visited the content.
     * @type {string}
     * @memberof ContentVisit
     */
    time: string;
    /**
     * The GUID, in [RFC4122](https://tools.ietf.org/html/rfc4122) format, of the user that visited the content.
     * @type {string}
     * @memberof ContentVisit
     */
    user_guid: string;
    /**
     * The key of the variant the user visited.  This will be `null` for static content.
     * @type {string}
     * @memberof ContentVisit
     */
    variant_key?: string;
}
/**
 * 
 * @export
 * @interface ContentVisitLogs
 */
export interface ContentVisitLogs {
    /**
     * 
     * @type {ContentVisitPager}
     * @memberof ContentVisitLogs
     */
    paging?: ContentVisitPager;
    /**
     * The content visit logs
     * @type {Array<ContentVisit>}
     * @memberof ContentVisitLogs
     */
    results?: Array<ContentVisit>;
}
/**
 * Paging object that can be used for navigation
 * @export
 * @interface ContentVisitPager
 */
export interface ContentVisitPager {
    /**
     * 
     * @type {AuditPagerCursors}
     * @memberof ContentVisitPager
     */
    cursors: AuditPagerCursors;
    /**
     * A full URL of the first page of results.  It will be `null` if the current response represents the first page of results.
     * @type {string}
     * @memberof ContentVisitPager
     */
    first: string | null;
    /**
     * A full URL of the last page of results.  It will be `null` if the current response represents the last page of results.
     * @type {string}
     * @memberof ContentVisitPager
     */
    last: string | null;
    /**
     * A full URL of the next page of results when the original request was made.  It will be `null` if the current response represents the last page of results.
     * @type {string}
     * @memberof ContentVisitPager
     */
    next: string | null;
    /**
     * A full URL of the previous page of results when the original request was made.  It will be `null` if the current response represents the first page of results.
     * @type {string}
     * @memberof ContentVisitPager
     */
    previous: string | null;
}
/**
 * 
 * @export
 * @interface EditableUser
 */
export interface EditableUser {
    /**
     * The user\'s email
     * @type {string}
     * @memberof EditableUser
     */
    email: string;
    /**
     * The user\'s first name
     * @type {string}
     * @memberof EditableUser
     */
    first_name: string;
    /**
     * The user\'s last name
     * @type {string}
     * @memberof EditableUser
     */
    last_name: string;
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was last updated in the RStudio Connect server
     * @type {string}
     * @memberof EditableUser
     */
    updated_time: string;
    /**
     * The user\'s role
     * @type {string}
     * @memberof EditableUser
     */
    user_role: EditableUserUserRoleEnum;
    /**
     * The user\'s username
     * @type {string}
     * @memberof EditableUser
     */
    username: string;
}

/**
    * @export
    * @enum {string}
    */
export enum EditableUserUserRoleEnum {
    Administrator = 'administrator',
    Publisher = 'publisher',
    Viewer = 'viewer'
}

/**
 * Defines an environment variable and its value.
 * @export
 * @interface EnvironmentVariable
 */
export interface EnvironmentVariable {
    /**
     * Name of the environment variable.
     * @type {string}
     * @memberof EnvironmentVariable
     */
    name?: string;
    /**
     * New value of the environment variable. A value of `null` will delete the environment variable.
     * @type {string}
     * @memberof EnvironmentVariable
     */
    value?: string | null;
}
/**
 * 
 * @export
 * @interface Group
 */
export interface Group {
    /**
     * The unique identifier
     * @type {string}
     * @memberof Group
     */
    guid: string;
    /**
     * The group name
     * @type {string}
     * @memberof Group
     */
    name: string;
    /**
     * The group owner\'s unique identifier. When using LDAP, or SAML/OAuth2/Proxied authentication with group provisioning enabled this property will always be `null`.
     * @type {string}
     * @memberof Group
     */
    owner_guid: string | null;
}
/**
 * 
 * @export
 * @interface GroupMembers
 */
export interface GroupMembers {
    /**
     * The current page of results
     * @type {number}
     * @memberof GroupMembers
     */
    current_page?: number;
    /**
     * The group members list
     * @type {Array<User>}
     * @memberof GroupMembers
     */
    results?: Array<User>;
    /**
     * The number of group members
     * @type {number}
     * @memberof GroupMembers
     */
    total?: number;
}
/**
 * 
 * @export
 * @interface GroupRemoteSearch
 */
export interface GroupRemoteSearch {
    /**
     * The current page of results
     * @type {number}
     * @memberof GroupRemoteSearch
     */
    current_page?: number;
    /**
     * The groups list
     * @type {Array<GroupWithTicket>}
     * @memberof GroupRemoteSearch
     */
    results?: Array<GroupWithTicket>;
    /**
     * The number of groups in the search results
     * @type {number}
     * @memberof GroupRemoteSearch
     */
    total?: number;
}
/**
 * 
 * @export
 * @interface GroupWithTicket
 */
export interface GroupWithTicket {
    /**
     * The group\'s unique identifier in [RFC4122](https://tools.ietf.org/html/rfc4122) format. When a group does not exist in the RStudio Connect server, this property will be `null`.
     * @type {string}
     * @memberof GroupWithTicket
     */
    guid: string | null;
    /**
     * The group name
     * @type {string}
     * @memberof GroupWithTicket
     */
    name: string;
    /**
     * This value is for actions that require a `temp_ticket`, such as adding an LDAP group to the Connect server.
     * @type {string}
     * @memberof GroupWithTicket
     */
    temp_ticket: string;
}
/**
 * 
 * @export
 * @interface Groups
 */
export interface Groups {
    /**
     * The current page of results
     * @type {number}
     * @memberof Groups
     */
    current_page?: number;
    /**
     * The groups list
     * @type {Array<Group>}
     * @memberof Groups
     */
    results?: Array<Group>;
    /**
     * The number of users that match the given filters
     * @type {number}
     * @memberof Groups
     */
    total?: number;
}
/**
 * The Content fields that can be specified when creating a content item.
 * @export
 * @interface InlineObject
 */
export interface InlineObject {
    /**
     * Access type describes how this content manages its viewers. The value `all` is the most permissive; any visitor to RStudio Connect will be able to view this content. The value `logged_in` indicates that all RStudio Connect accounts may view the content. The `acl` value lets specifically enumerated users and groups view the content. Users configured as collaborators may always view content.
     * @type {string}
     * @memberof InlineObject
     */
    access_type?: InlineObjectAccessTypeEnum;
    /**
     * Maximum number of seconds allowed without data sent or received across a client connection. A value of `0` means connections will never time-out (not recommended). When `null`, the default `Scheduler.ConnectionTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject
     */
    connection_timeout?: number | null;
    /**
     * A rich description of this content.
     * @type {string}
     * @memberof InlineObject
     */
    description?: string;
    /**
     * The maximum number of seconds a worker process for an interactive application to remain alive after it goes idle (no active connections). When `null`, the default `Scheduler.IdleTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject
     */
    idle_timeout?: number | null;
    /**
     * The maximum number of seconds allowed for an interactive application to start. RStudio Connect must be able to connect to a newly launched Shiny application, for example, before this threshold has elapsed. When `null`, the default `Scheduler.InitTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject
     */
    init_timeout?: number | null;
    /**
     * Controls how aggressively new processes are spawned. When `null`, the default `Scheduler.LoadFactor` is used. Applies only to content types that are executed on demand.  The valid range is between 0.0 and 1.0.
     * @type {number}
     * @memberof InlineObject
     */
    load_factor?: number | null;
    /**
     * Specifies the maximum number of client connections allowed to an individual process. Incoming connections which will exceed this limit are routed to a new process or rejected. When `null`, the default `Scheduler.MaxConnsPerProcess` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject
     */
    max_conns_per_process?: number | null;
    /**
     * Specifies the total number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MaxProcesses` is used. Applies only to content types that are executed on demand.  The value cannot be greater than `Scheduler.MaxProcessesLimit`.
     * @type {number}
     * @memberof InlineObject
     */
    max_processes?: number | null;
    /**
     * Specifies the minimum number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MinProcesses` is used. Applies only to content types that are executed on demand.  The value cannot be less than `Scheduler.MinProcessesLimit`.
     * @type {number}
     * @memberof InlineObject
     */
    min_processes?: number | null;
    /**
     * A simple, URL-friendly identifier. Allows alpha-numeric characters, hyphens (`\"-\"`), and underscores (`\"_\"`).
     * @type {string}
     * @memberof InlineObject
     */
    name?: string;
    /**
     * Maximum number of seconds allowed without data received from a client connection. A value of `0` means a lack of client (browser) interaction never causes the connection to close. When `null`, the default `Scheduler.ReadTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject
     */
    read_timeout?: number | null;
    /**
     * The title of this content.
     * @type {string}
     * @memberof InlineObject
     */
    title?: string | null;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObjectAccessTypeEnum {
    All = 'all',
    LoggedIn = 'logged_in',
    Acl = 'acl'
}

/**
 * The Content fields that can be specified when updating a content item.
 * @export
 * @interface InlineObject1
 */
export interface InlineObject1 {
    /**
     * Access type describes how this content manages its viewers. The value `all` is the most permissive; any visitor to RStudio Connect will be able to view this content. The value `logged_in` indicates that all RStudio Connect accounts may view the content. The `acl` value lets specifically enumerated users and groups view the content. Users configured as collaborators may always view content.
     * @type {string}
     * @memberof InlineObject1
     */
    access_type?: InlineObject1AccessTypeEnum;
    /**
     * Maximum number of seconds allowed without data sent or received across a client connection. A value of `0` means connections will never time-out (not recommended). When `null`, the default `Scheduler.ConnectionTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject1
     */
    connection_timeout?: number | null;
    /**
     * A rich description of this content.
     * @type {string}
     * @memberof InlineObject1
     */
    description?: string;
    /**
     * The maximum number of seconds a worker process for an interactive application to remain alive after it goes idle (no active connections). When `null`, the default `Scheduler.IdleTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject1
     */
    idle_timeout?: number | null;
    /**
     * The maximum number of seconds allowed for an interactive application to start. RStudio Connect must be able to connect to a newly launched Shiny application, for example, before this threshold has elapsed. When `null`, the default `Scheduler.InitTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject1
     */
    init_timeout?: number | null;
    /**
     * Controls how aggressively new processes are spawned. When `null`, the default `Scheduler.LoadFactor` is used. Applies only to content types that are executed on demand.  The valid range is between 0.0 and 1.0.
     * @type {number}
     * @memberof InlineObject1
     */
    load_factor?: number | null;
    /**
     * Specifies the maximum number of client connections allowed to an individual process. Incoming connections which will exceed this limit are routed to a new process or rejected. When `null`, the default `Scheduler.MaxConnsPerProcess` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject1
     */
    max_conns_per_process?: number | null;
    /**
     * Specifies the total number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MaxProcesses` is used. Applies only to content types that are executed on demand.  The value cannot be greater than `Scheduler.MaxProcessesLimit`.
     * @type {number}
     * @memberof InlineObject1
     */
    max_processes?: number | null;
    /**
     * Specifies the minimum number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MinProcesses` is used. Applies only to content types that are executed on demand.  The value cannot be less than `Scheduler.MinProcessesLimit`.
     * @type {number}
     * @memberof InlineObject1
     */
    min_processes?: number | null;
    /**
     * A simple, URL-friendly identifier. Allows alpha-numeric characters, hyphens (`\"-\"`), and underscores (`\"_\"`).
     * @type {string}
     * @memberof InlineObject1
     */
    name?: string;
    /**
     * The unique identifier of the user who owns this content item. It is automatically assigned when the content is created. Only administrators can change this value.
     * @type {string}
     * @memberof InlineObject1
     */
    owner_guid?: string | null;
    /**
     * Maximum number of seconds allowed without data received from a client connection. A value of `0` means a lack of client (browser) interaction never causes the connection to close. When `null`, the default `Scheduler.ReadTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject1
     */
    read_timeout?: number | null;
    /**
     * The title of this content.
     * @type {string}
     * @memberof InlineObject1
     */
    title?: string | null;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject1AccessTypeEnum {
    All = 'all',
    LoggedIn = 'logged_in',
    Acl = 'acl'
}

/**
 * 
 * @export
 * @interface InlineObject10
 */
export interface InlineObject10 {
    /**
     * The temporary ticket used for creating a group on the RStudio Connect server. It is obtained from the <a href=\"#get-/v1/groups/remote\" onclick=\"linkClick\">GET /v1/groups/remote</a> endpoint.
     * @type {string}
     * @memberof InlineObject10
     */
    temp_ticket: string;
}
/**
 * 
 * @export
 * @interface InlineObject11
 */
export interface InlineObject11 {
    /**
     * The group\'s desired name
     * @type {string}
     * @memberof InlineObject11
     */
    name: string;
    /**
     * Applies to SAML, OAuth2 and Proxied authentication when the setting `GroupsByUniqueId` is enabled. This field must not be present otherwise.
     * @type {string}
     * @memberof InlineObject11
     */
    unique_id?: string;
}
/**
 * 
 * @export
 * @interface InlineObject12
 */
export interface InlineObject12 {
    /**
     * The user\'s unique identifier
     * @type {string}
     * @memberof InlineObject12
     */
    user_guid: string;
}
/**
 * 
 * @export
 * @interface InlineObject13
 */
export interface InlineObject13 {
    /**
     * The group\'s desired name
     * @type {string}
     * @memberof InlineObject13
     */
    name?: string;
    /**
     * The group owner\'s unique identifier. When using SAML/OAuth2/Proxied authentication with group provisioning enabled this property must always be `null`. Any existing owner is also removed in this condition.
     * @type {string}
     * @memberof InlineObject13
     */
    owner_guid?: string | null;
}
/**
 * The fields that can be specified when creating or updating a tag
 * @export
 * @interface InlineObject14
 */
export interface InlineObject14 {
    /**
     * The name of the tag. Tags under the same parent must have a unique name and cannot be longer than 255 characters.
     * @type {string}
     * @memberof InlineObject14
     */
    name?: string;
    /**
     * The identifier for the parent tag. If there is no parent_id, the tag will be a top-level tag.
     * @type {string}
     * @memberof InlineObject14
     */
    parent_id?: string | null;
}
/**
 * The fields that can be specified when creating or updating a tag
 * @export
 * @interface InlineObject15
 */
export interface InlineObject15 {
    /**
     * The name of the tag. Tags under the same parent must have a unique name and cannot be longer than 255 characters.
     * @type {string}
     * @memberof InlineObject15
     */
    name?: string;
    /**
     * The identifier for the parent tag. If there is no parent_id, the tag will be a top-level tag.
     * @type {string}
     * @memberof InlineObject15
     */
    parent_id?: string | null;
}
/**
 * 
 * @export
 * @interface InlineObject16
 */
export interface InlineObject16 {
    /**
     * The temporary ticket used for creating a user on the RStudio Connect server. It is obtained from the  <a href=\"#get-/v1/users/remote\" onclick=\"linkClick\">GET /v1/users/remote</a> endpoint.
     * @type {string}
     * @memberof InlineObject16
     */
    temp_ticket: string;
}
/**
 * 
 * @export
 * @interface InlineObject17
 */
export interface InlineObject17 {
    /**
     * The user\'s email.
     * @type {string}
     * @memberof InlineObject17
     */
    email?: string;
    /**
     * The user\'s first name
     * @type {string}
     * @memberof InlineObject17
     */
    first_name?: string;
    /**
     * The user\'s last name
     * @type {string}
     * @memberof InlineObject17
     */
    last_name?: string;
    /**
     * Applies only to password authentication. Must be at least 6 characters long. Cannot be set when `user_must_set_password` is true.
     * @type {string}
     * @memberof InlineObject17
     */
    password?: string;
    /**
     * Applies only to proxied authentication when `ProxyAuth.UniqueIdHeader` is being used.  It is required when SAML or OAuth2 (non-Google) authentication is being used.
     * @type {string}
     * @memberof InlineObject17
     */
    unique_id?: string;
    /**
     * Applies only to password authentication.  - When `true`, the created user will be asked to set their password on first login. The `password` request parameter cannot be set when this parameter is `true`. - When `false`, you must specify the `password`.
     * @type {boolean}
     * @memberof InlineObject17
     */
    user_must_set_password?: boolean;
    /**
     * The user\'s role. If `null` it will default to the role specified by the config setting `Authorization.DefaultUserRole`.
     * @type {string}
     * @memberof InlineObject17
     */
    user_role?: InlineObject17UserRoleEnum;
    /**
     * The user\'s desired username
     * @type {string}
     * @memberof InlineObject17
     */
    username: string;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject17UserRoleEnum {
    Administrator = 'administrator',
    Publisher = 'publisher',
    Viewer = 'viewer'
}

/**
 * 
 * @export
 * @interface InlineObject18
 */
export interface InlineObject18 {
    /**
     * The user\'s new email.
     * @type {string}
     * @memberof InlineObject18
     */
    email?: string;
    /**
     * The user\'s new first name
     * @type {string}
     * @memberof InlineObject18
     */
    first_name?: string;
    /**
     * The user\'s new last name
     * @type {string}
     * @memberof InlineObject18
     */
    last_name?: string;
    /**
     * The user\'s new role. Note that you can only downgrade yourself. Administrators can change other users\' roles to any valid role.
     * @type {string}
     * @memberof InlineObject18
     */
    user_role?: InlineObject18UserRoleEnum;
    /**
     * The user\'s new username
     * @type {string}
     * @memberof InlineObject18
     */
    username?: string;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject18UserRoleEnum {
    Administrator = 'administrator',
    Publisher = 'publisher',
    Viewer = 'viewer'
}

/**
 * 
 * @export
 * @interface InlineObject19
 */
export interface InlineObject19 {
    /**
     * Whether or not the user should be locked.
     * @type {boolean}
     * @memberof InlineObject19
     */
    locked: boolean;
}
/**
 * Optionally identifies the target deployment bundle.
 * @export
 * @interface InlineObject2
 */
export interface InlineObject2 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject2
     */
    bundle_id?: string | null;
}
/**
 * The fields that can be specified when creating or updating a content permission item.
 * @export
 * @interface InlineObject3
 */
export interface InlineObject3 {
    /**
     * The identifier of the principal (user or group).
     * @type {string}
     * @memberof InlineObject3
     */
    principal_guid?: string;
    /**
     * The type of principal.
     * @type {string}
     * @memberof InlineObject3
     */
    principal_type?: InlineObject3PrincipalTypeEnum;
    /**
     * The level of access that the principal has been given to this content item.
     * @type {string}
     * @memberof InlineObject3
     */
    role?: InlineObject3RoleEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject3PrincipalTypeEnum {
    User = 'user',
    Group = 'group'
}
/**
    * @export
    * @enum {string}
    */
export enum InlineObject3RoleEnum {
    Viewer = 'viewer',
    Owner = 'owner'
}

/**
 * The fields that can be specified when creating or updating a content permission item.
 * @export
 * @interface InlineObject4
 */
export interface InlineObject4 {
    /**
     * The identifier of the principal (user or group).
     * @type {string}
     * @memberof InlineObject4
     */
    principal_guid?: string;
    /**
     * The type of principal.
     * @type {string}
     * @memberof InlineObject4
     */
    principal_type?: InlineObject4PrincipalTypeEnum;
    /**
     * The level of access that the principal has been given to this content item.
     * @type {string}
     * @memberof InlineObject4
     */
    role?: InlineObject4RoleEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject4PrincipalTypeEnum {
    User = 'user',
    Group = 'group'
}
/**
    * @export
    * @enum {string}
    */
export enum InlineObject4RoleEnum {
    Viewer = 'viewer',
    Owner = 'owner'
}

/**
 * 
 * @export
 * @interface InlineObject5
 */
export interface InlineObject5 {
    /**
     * The unique identifier for the tag
     * @type {string}
     * @memberof InlineObject5
     */
    tag_id?: string;
}
/**
 * The fields that can be specified when creating a vanity URL.
 * @export
 * @interface InlineObject6
 */
export interface InlineObject6 {
    /**
     * If true, and a vanity URL exists with the specified path, reassign it to the specified content item. To reassign a vanity URL, you must be an administrator, or a collaborator/owner of both content items.
     * @type {boolean}
     * @memberof InlineObject6
     */
    force?: boolean;
    /**
     * The URL path that will be assigned to this content item. HTTP requests to this path on the Connect server will be routed to the associated content item.
     * @type {string}
     * @memberof InlineObject6
     */
    path?: string;
}
/**
 * The Content fields that can be specified when creating or updating a content item.
 * @export
 * @interface InlineObject7
 */
export interface InlineObject7 {
    /**
     * Access type describes how this content manages its viewers. The value `all` is the most permissive; any visitor to RStudio Connect will be able to view this content. The value `logged_in` indicates that all RStudio Connect accounts may view the content. The `acl` value lets specifically enumerated users and groups view the content. Users configured as collaborators may always view content.
     * @type {string}
     * @memberof InlineObject7
     */
    access_type?: InlineObject7AccessTypeEnum;
    /**
     * Maximum number of seconds allowed without data sent or received across a client connection. A value of `0` means connections will never time-out (not recommended). When `null`, the default `Scheduler.ConnectionTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    connection_timeout?: number | null;
    /**
     * A rich description of this content.
     * @type {string}
     * @memberof InlineObject7
     */
    description?: string;
    /**
     * The maximum number of seconds a worker process for an interactive application to remain alive after it goes idle (no active connections). When `null`, the default `Scheduler.IdleTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    idle_timeout?: number | null;
    /**
     * The maximum number of seconds allowed for an interactive application to start. RStudio Connect must be able to connect to a newly launched Shiny application, for example, before this threshold has elapsed. When `null`, the default `Scheduler.InitTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    init_timeout?: number | null;
    /**
     * Controls how aggressively new processes are spawned. When `null`, the default `Scheduler.LoadFactor` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    load_factor?: number | null;
    /**
     * Specifies the maximum number of client connections allowed to an individual process. Incoming connections which will exceed this limit are routed to a new process or rejected. When `null`, the default `Scheduler.MaxConnsPerProcess` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    max_conns_per_process?: number | null;
    /**
     * Specifies the total number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MaxProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    max_processes?: number | null;
    /**
     * Specifies the minimum number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MinProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    min_processes?: number | null;
    /**
     * A simple, URL-friendly identifier. Allows alpha-numeric characters, hyphens (`\"-\"`), and underscores (`\"_\"`).
     * @type {string}
     * @memberof InlineObject7
     */
    name: string;
    /**
     * Maximum number of seconds allowed without data received from a client connection. A value of `0` means a lack of client (browser) interaction never causes the connection to close. When `null`, the default `Scheduler.ReadTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject7
     */
    read_timeout?: number | null;
    /**
     * The title of this content.
     * @type {string}
     * @memberof InlineObject7
     */
    title?: string | null;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject7AccessTypeEnum {
    All = 'all',
    LoggedIn = 'logged_in',
    Acl = 'acl'
}

/**
 * The Content fields that can be specified when creating or updating a content item.
 * @export
 * @interface InlineObject8
 */
export interface InlineObject8 {
    /**
     * Access type describes how this content manages its viewers. The value `all` is the most permissive; any visitor to RStudio Connect will be able to view this content. The value `logged_in` indicates that all RStudio Connect accounts may view the content. The `acl` value lets specifically enumerated users and groups view the content. Users configured as collaborators may always view content.
     * @type {string}
     * @memberof InlineObject8
     */
    access_type?: InlineObject8AccessTypeEnum;
    /**
     * Maximum number of seconds allowed without data sent or received across a client connection. A value of `0` means connections will never time-out (not recommended). When `null`, the default `Scheduler.ConnectionTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    connection_timeout?: number | null;
    /**
     * A rich description of this content.
     * @type {string}
     * @memberof InlineObject8
     */
    description?: string;
    /**
     * The maximum number of seconds a worker process for an interactive application to remain alive after it goes idle (no active connections). When `null`, the default `Scheduler.IdleTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    idle_timeout?: number | null;
    /**
     * The maximum number of seconds allowed for an interactive application to start. RStudio Connect must be able to connect to a newly launched Shiny application, for example, before this threshold has elapsed. When `null`, the default `Scheduler.InitTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    init_timeout?: number | null;
    /**
     * Controls how aggressively new processes are spawned. When `null`, the default `Scheduler.LoadFactor` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    load_factor?: number | null;
    /**
     * Specifies the maximum number of client connections allowed to an individual process. Incoming connections which will exceed this limit are routed to a new process or rejected. When `null`, the default `Scheduler.MaxConnsPerProcess` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    max_conns_per_process?: number | null;
    /**
     * Specifies the total number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MaxProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    max_processes?: number | null;
    /**
     * Specifies the minimum number of concurrent processes allowed for a single interactive application. When `null`, the default `Scheduler.MinProcesses` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    min_processes?: number | null;
    /**
     * A simple, URL-friendly identifier. Allows alpha-numeric characters, hyphens (`\"-\"`), and underscores (`\"_\"`).
     * @type {string}
     * @memberof InlineObject8
     */
    name: string;
    /**
     * Maximum number of seconds allowed without data received from a client connection. A value of `0` means a lack of client (browser) interaction never causes the connection to close. When `null`, the default `Scheduler.ReadTimeout` is used. Applies only to content types that are executed on demand.
     * @type {number}
     * @memberof InlineObject8
     */
    read_timeout?: number | null;
    /**
     * The title of this content.
     * @type {string}
     * @memberof InlineObject8
     */
    title?: string | null;
}

/**
    * @export
    * @enum {string}
    */
export enum InlineObject8AccessTypeEnum {
    All = 'all',
    LoggedIn = 'logged_in',
    Acl = 'acl'
}

/**
 * Optionally identifies the target deployment bundle.
 * @export
 * @interface InlineObject9
 */
export interface InlineObject9 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    bundle_id?: string | null;
}
/**
 * The fields that are returned when getting or listing vanity URLs.
 * @export
 * @interface InlineResponse200
 */
export interface InlineResponse200 {
    /**
     * The unique identifier of the associated content item.
     * @type {string}
     * @memberof InlineResponse200
     */
    content_guid?: string;
    /**
     * The timestamp (RFC3339) indicating when this vanity URL was created.
     * @type {string}
     * @memberof InlineResponse200
     */
    created_time?: string;
    /**
     * The URL path that will be used by this application. HTTP requests to this path on the Connect server will be routed to the associated content item.
     * @type {string}
     * @memberof InlineResponse200
     */
    path?: string;
}
/**
 * The fields that are returned when getting or listing vanity URLs.
 * @export
 * @interface InlineResponse2001
 */
export interface InlineResponse2001 {
    /**
     * The unique identifier of the associated content item.
     * @type {string}
     * @memberof InlineResponse2001
     */
    content_guid?: string;
    /**
     * The timestamp (RFC3339) indicating when this vanity URL was created.
     * @type {string}
     * @memberof InlineResponse2001
     */
    created_time?: string;
    /**
     * The URL path that will be used by this application. HTTP requests to this path on the Connect server will be routed to the associated content item.
     * @type {string}
     * @memberof InlineResponse2001
     */
    path?: string;
}
/**
 * Identifies the task that can be used to track the progress of a deployment operation.
 * @export
 * @interface InlineResponse2002
 */
export interface InlineResponse2002 {
    /**
     * Identifier for the created deployment task.
     * @type {string}
     * @memberof InlineResponse2002
     */
    task_id?: string;
}
/**
 * Describes the bundle created by a just-completed upload.
 * @export
 * @interface InlineResponse2003
 */
export interface InlineResponse2003 {
    /**
     * Identifier for the newly created bundle.
     * @type {string}
     * @memberof InlineResponse2003
     */
    bundle_id?: string;
    /**
     * The number of bytes received.
     * @type {number}
     * @memberof InlineResponse2003
     */
    size?: number;
}
/**
 * The task tracks the output and status of some operation being performed by RStudio Connect. It is most commonly used to contain details about the progress of a deployment operation.
 * @export
 * @interface InlineResponse2004
 */
export interface InlineResponse2004 {
    /**
     * Numeric indication as to the cause of an error. Non-zero when an error has occured.
     * @type {number}
     * @memberof InlineResponse2004
     */
    code?: number;
    /**
     * Description of the error. An empty string when no error has occurred.
     * @type {string}
     * @memberof InlineResponse2004
     */
    error?: string;
    /**
     * Indicates that a task has completed.
     * @type {boolean}
     * @memberof InlineResponse2004
     */
    finished?: boolean;
    /**
     * The identifier for this task.
     * @type {string}
     * @memberof InlineResponse2004
     */
    id?: string;
    /**
     * The total number of output lines produced so far. Use as the value to `first` in the next request to only fetch output lines beyond what you have already received.
     * @type {number}
     * @memberof InlineResponse2004
     */
    last?: number;
    /**
     * An array containing lines of output produced by the task. The initial line of output is dictated by the `first` input parameter. The offset of the last output line is indicated by the `last` response field.
     * @type {Array<string>}
     * @memberof InlineResponse2004
     */
    output?: Array<string>;
}
/**
 * The task tracks the output and status of some operation being performed by RStudio Connect. It is most commonly used to contain details about the progress of a deployment operation.
 * @export
 * @interface InlineResponse2005
 */
export interface InlineResponse2005 {
    /**
     * Numeric indication as to the cause of an error. Non-zero when an error has occured.
     * @type {number}
     * @memberof InlineResponse2005
     */
    code?: number;
    /**
     * Description of the error. An empty string when no error has occurred.
     * @type {string}
     * @memberof InlineResponse2005
     */
    error?: string;
    /**
     * Indicates that a task has completed.
     * @type {boolean}
     * @memberof InlineResponse2005
     */
    finished?: boolean;
    /**
     * The identifier for this task.
     * @type {string}
     * @memberof InlineResponse2005
     */
    id?: string;
    /**
     * The total number of output lines produced so far. Use as the value to `first` in the next request to only fetch output lines beyond what you have already received.
     * @type {number}
     * @memberof InlineResponse2005
     */
    last?: number;
    /**
     * An array containing lines of output produced by the task. The initial line of output is dictated by the `first` input parameter. The offset of the last output line is indicated by the `last` response field.
     * @type {Array<string>}
     * @memberof InlineResponse2005
     */
    output?: Array<string>;
    /**
     * 
     * @type {InlineResponse2005Result}
     * @memberof InlineResponse2005
     */
    result?: InlineResponse2005Result | null;
}
/**
 * A value representing the result of the operation, if any. For deployment tasks, this value is `null`.
 * @export
 * @interface InlineResponse2005Result
 */
export interface InlineResponse2005Result {
    /**
     * The data produced by this task.
     * @type {object}
     * @memberof InlineResponse2005Result
     */
    data?: object;
    /**
     * The type of data returned.
     * @type {string}
     * @memberof InlineResponse2005Result
     */
    type?: string;
}
/**
 * The fields that are returned when getting or listing vanity URLs.
 * @export
 * @interface InlineResponse2006
 */
export interface InlineResponse2006 {
    /**
     * The unique identifier of the associated content item.
     * @type {string}
     * @memberof InlineResponse2006
     */
    content_guid?: string;
    /**
     * The timestamp (RFC3339) indicating when this vanity URL was created.
     * @type {string}
     * @memberof InlineResponse2006
     */
    created_time?: string;
    /**
     * The URL path that will be used by this application. HTTP requests to this path on the Connect server will be routed to the associated content item.
     * @type {string}
     * @memberof InlineResponse2006
     */
    path?: string;
}
/**
 * Identifies the task that can be used to track the progress of a deployment operation.
 * @export
 * @interface InlineResponse202
 */
export interface InlineResponse202 {
    /**
     * Identifier for the created deployment task.
     * @type {string}
     * @memberof InlineResponse202
     */
    task_id?: string;
}
/**
 * Defines the permission level that a user or group has been granted to a content item.
 * @export
 * @interface Permission
 */
export interface Permission {
    /**
     * The identifier of the content item.
     * @type {string}
     * @memberof Permission
     */
    content_guid?: string;
    /**
     * The identifier for this permission entry.
     * @type {string}
     * @memberof Permission
     */
    id?: string;
    /**
     * The identifier of the principal (user or group) listed in the ACL.
     * @type {string}
     * @memberof Permission
     */
    principal_guid?: string;
    /**
     * The type of principal.
     * @type {string}
     * @memberof Permission
     */
    principal_type?: PermissionPrincipalTypeEnum;
    /**
     * The level of access that the principal has been given to this content item.
     * @type {string}
     * @memberof Permission
     */
    role?: PermissionRoleEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum PermissionPrincipalTypeEnum {
    User = 'user',
    Group = 'group'
}
/**
    * @export
    * @enum {string}
    */
export enum PermissionRoleEnum {
    Viewer = 'viewer',
    Owner = 'owner'
}

/**
 * This defines the information provided by the server about a single installation of R.
 * @export
 * @interface RInstallation
 */
export interface RInstallation {
    /**
     * The version number of this R installation.
     * @type {string}
     * @memberof RInstallation
     */
    version?: string;
}
/**
 * This defines the top-level object that describes the data returned by the server. It contains information about each installation of R that is known.
 * @export
 * @interface RInstallations
 */
export interface RInstallations {
    /**
     * The array of information about RStudio Connect\'s R installations.
     * @type {Array<RInstallation>}
     * @memberof RInstallations
     */
    installations?: Array<RInstallation>;
}
/**
 * 
 * @export
 * @interface RemoteSearchResults
 */
export interface RemoteSearchResults {
    /**
     * The current page of results
     * @type {number}
     * @memberof RemoteSearchResults
     */
    current_page?: number;
    /**
     * The users list
     * @type {Array<UserWithTicket>}
     * @memberof RemoteSearchResults
     */
    results?: Array<UserWithTicket>;
    /**
     * The number of users in the search results
     * @type {number}
     * @memberof RemoteSearchResults
     */
    total?: number;
}
/**
 * 
 * @export
 * @interface ShinyAppUsage
 */
export interface ShinyAppUsage {
    /**
     * The GUID, in [RFC4122](https://tools.ietf.org/html/rfc4122) format, of the Shiny application this information pertains to.
     * @type {string}
     * @memberof ShinyAppUsage
     */
    content_guid: string;
    /**
     * The data version the record was recorded with.  The [Shiny Application Events](../admin/historical-information/#shiny-application-events) section of the RStudio Connect Admin Guide explains how to interpret `data_version` values.
     * @type {number}
     * @memberof ShinyAppUsage
     */
    data_version: number;
    /**
     * The timestamp, in [RFC3339](https://tools.ietf.org/html/rfc3339) format, when the user left the application.
     * @type {string}
     * @memberof ShinyAppUsage
     */
    ended: string;
    /**
     * The timestamp, in [RFC3339](https://tools.ietf.org/html/rfc3339) format, when the user opened the application.
     * @type {string}
     * @memberof ShinyAppUsage
     */
    started: string;
    /**
     * The GUID, in [RFC4122](https://tools.ietf.org/html/rfc4122) format, of the user that visited the application.
     * @type {string}
     * @memberof ShinyAppUsage
     */
    user_guid: string;
}
/**
 * 
 * @export
 * @interface ShinyAppUsageLogs
 */
export interface ShinyAppUsageLogs {
    /**
     * 
     * @type {ShinyAppUsagePager}
     * @memberof ShinyAppUsageLogs
     */
    paging?: ShinyAppUsagePager;
    /**
     * The Shiny application usage logs
     * @type {Array<ShinyAppUsage>}
     * @memberof ShinyAppUsageLogs
     */
    results?: Array<ShinyAppUsage>;
}
/**
 * Paging object that can be used for navigation
 * @export
 * @interface ShinyAppUsagePager
 */
export interface ShinyAppUsagePager {
    /**
     * 
     * @type {AuditPagerCursors}
     * @memberof ShinyAppUsagePager
     */
    cursors: AuditPagerCursors;
    /**
     * A full URL of the first page of results.  It will be `null` if the current response represents the first page of results.
     * @type {string}
     * @memberof ShinyAppUsagePager
     */
    first: string | null;
    /**
     * A full URL of the last page of results.  It will be `null` if the current response represents the last page of results.
     * @type {string}
     * @memberof ShinyAppUsagePager
     */
    last: string | null;
    /**
     * A full URL of the next page of results when the original request was made.  It will be `null` if the current response represents the last page of results.
     * @type {string}
     * @memberof ShinyAppUsagePager
     */
    next: string | null;
    /**
     * A full URL of the previous page of results when the original request was made.  It will be `null` if the current response represents the first page of results.
     * @type {string}
     * @memberof ShinyAppUsagePager
     */
    previous: string | null;
}
/**
 * Defines a tag which is used to organize content within Connect.
 * @export
 * @interface Tag
 */
export interface Tag {
    /**
     * The timestamp (RFC3339) indicating when the tag was created.
     * @type {string}
     * @memberof Tag
     */
    created_time?: string;
    /**
     * The identifier for the tag.
     * @type {string}
     * @memberof Tag
     */
    id?: string;
    /**
     * The name of the tag.
     * @type {string}
     * @memberof Tag
     */
    name?: string;
    /**
     * The identifier for the parent tag. If there is no parent_id, the tag is a top-level tag.
     * @type {string}
     * @memberof Tag
     */
    parent_id?: string | null;
    /**
     * The timestamp (RFC3339) indicating when the tag was created.
     * @type {string}
     * @memberof Tag
     */
    updated_time?: string;
}
/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was last active on the RStudio Connect server
     * @type {string}
     * @memberof User
     */
    active_time: string | null;
    /**
     * When `false`, the created user must confirm their account through an email. This feature is unique to password authentication.
     * @type {boolean}
     * @memberof User
     */
    confirmed: boolean;
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was created in the RStudio Connect server
     * @type {string}
     * @memberof User
     */
    created_time: string;
    /**
     * The user\'s email
     * @type {string}
     * @memberof User
     */
    email: string;
    /**
     * The user\'s first name
     * @type {string}
     * @memberof User
     */
    first_name: string;
    /**
     * The user\'s GUID, or unique identifier, in UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format
     * @type {string}
     * @memberof User
     */
    guid: string;
    /**
     * The user\'s last name
     * @type {string}
     * @memberof User
     */
    last_name: string;
    /**
     * Whether or not the user is locked
     * @type {boolean}
     * @memberof User
     */
    locked: boolean;
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was last updated in the RStudio Connect server
     * @type {string}
     * @memberof User
     */
    updated_time: string;
    /**
     * The user\'s role
     * @type {string}
     * @memberof User
     */
    user_role: UserUserRoleEnum;
    /**
     * The user\'s username
     * @type {string}
     * @memberof User
     */
    username: string;
}

/**
    * @export
    * @enum {string}
    */
export enum UserUserRoleEnum {
    Administrator = 'administrator',
    Publisher = 'publisher',
    Viewer = 'viewer'
}

/**
 * 
 * @export
 * @interface UserWithTicket
 */
export interface UserWithTicket {
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was last active on the RStudio Connect server
     * @type {string}
     * @memberof UserWithTicket
     */
    active_time: string | null;
    /**
     * Whether or not the user is confirmed. This property will always be `true` for all authentication providers except password.
     * @type {boolean}
     * @memberof UserWithTicket
     */
    confirmed: boolean;
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was created in the RStudio Connect server
     * @type {string}
     * @memberof UserWithTicket
     */
    created_time: string;
    /**
     * The user\'s email
     * @type {string}
     * @memberof UserWithTicket
     */
    email: string;
    /**
     * The user\'s first name
     * @type {string}
     * @memberof UserWithTicket
     */
    first_name: string;
    /**
     * The user\'s GUID, or unique identifier in [RFC4122](https://tools.ietf.org/html/rfc4122) format. When a user does not exist in the RStudio Connect server, this property will be `null`.
     * @type {string}
     * @memberof UserWithTicket
     */
    guid: string | null;
    /**
     * The user\'s last name
     * @type {string}
     * @memberof UserWithTicket
     */
    last_name: string;
    /**
     * Whether or not the user is locked
     * @type {boolean}
     * @memberof UserWithTicket
     */
    locked: boolean;
    /**
     * This value is for actions that require a `temp_ticket`, such as adding an LDAP or OAuth2 with Google user to the Connect server.
     * @type {string}
     * @memberof UserWithTicket
     */
    temp_ticket: string;
    /**
     * The timestamp (in [RFC3339](https://tools.ietf.org/html/rfc3339) format) when the user was last updated in the RStudio Connect server
     * @type {string}
     * @memberof UserWithTicket
     */
    updated_time: string;
    /**
     * The user\'s role
     * @type {string}
     * @memberof UserWithTicket
     */
    user_role: UserWithTicketUserRoleEnum;
    /**
     * The user\'s username
     * @type {string}
     * @memberof UserWithTicket
     */
    username: string;
}

/**
    * @export
    * @enum {string}
    */
export enum UserWithTicketUserRoleEnum {
    Administrator = 'administrator',
    Publisher = 'publisher',
    Viewer = 'viewer'
}

/**
 * 
 * @export
 * @interface Users
 */
export interface Users {
    /**
     * The current page of results
     * @type {number}
     * @memberof Users
     */
    current_page?: number;
    /**
     * The users list
     * @type {Array<User>}
     * @memberof Users
     */
    results?: Array<User>;
    /**
     * The number of users that match the given filters
     * @type {number}
     * @memberof Users
     */
    total?: number;
}

/**
 * AuditLogsApi - axios parameter creator
 * @export
 */
export const AuditLogsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This endpoint returns a portion of the audit logs, as well as paging information that can be used to navigate the audit log results.  This endpoint requires administrator access.  This endpoint uses keyset pagination. The [Keyset Pagination](../cookbook/pagination/#keyset-pagination) recipe in the RStudio Connect API Cookbook has example code for fetching multiple pages.
         * @summary Get audit logs
         * @param {number} [limit] Number of logs to return. The minimum supported value is 1 and maximum supported value is 500. Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough logs to satisfy the limit.
         * @param {string} [previous] Gets the previous page of audit logs relative to the given id.
         * @param {string} [next] Gets the next page of audit logs relative to the given id.
         * @param {boolean} [ascOrder] Whether the audit logs should be listed in ascending order
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAuditLogs: async (limit?: number, previous?: string, next?: string, ascOrder?: boolean, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/audit_logs`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (previous !== undefined) {
                localVarQueryParameter['previous'] = previous;
            }

            if (next !== undefined) {
                localVarQueryParameter['next'] = next;
            }

            if (ascOrder !== undefined) {
                localVarQueryParameter['ascOrder'] = ascOrder;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuditLogsApi - functional programming interface
 * @export
 */
export const AuditLogsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * This endpoint returns a portion of the audit logs, as well as paging information that can be used to navigate the audit log results.  This endpoint requires administrator access.  This endpoint uses keyset pagination. The [Keyset Pagination](../cookbook/pagination/#keyset-pagination) recipe in the RStudio Connect API Cookbook has example code for fetching multiple pages.
         * @summary Get audit logs
         * @param {number} [limit] Number of logs to return. The minimum supported value is 1 and maximum supported value is 500. Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough logs to satisfy the limit.
         * @param {string} [previous] Gets the previous page of audit logs relative to the given id.
         * @param {string} [next] Gets the next page of audit logs relative to the given id.
         * @param {boolean} [ascOrder] Whether the audit logs should be listed in ascending order
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAuditLogs(limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuditLogs>> {
            const localVarAxiosArgs = await AuditLogsApiAxiosParamCreator(configuration).getAuditLogs(limit, previous, next, ascOrder, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * AuditLogsApi - factory interface
 * @export
 */
export const AuditLogsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * This endpoint returns a portion of the audit logs, as well as paging information that can be used to navigate the audit log results.  This endpoint requires administrator access.  This endpoint uses keyset pagination. The [Keyset Pagination](../cookbook/pagination/#keyset-pagination) recipe in the RStudio Connect API Cookbook has example code for fetching multiple pages.
         * @summary Get audit logs
         * @param {number} [limit] Number of logs to return. The minimum supported value is 1 and maximum supported value is 500. Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough logs to satisfy the limit.
         * @param {string} [previous] Gets the previous page of audit logs relative to the given id.
         * @param {string} [next] Gets the next page of audit logs relative to the given id.
         * @param {boolean} [ascOrder] Whether the audit logs should be listed in ascending order
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAuditLogs(limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any): AxiosPromise<AuditLogs> {
            return AuditLogsApiFp(configuration).getAuditLogs(limit, previous, next, ascOrder, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuditLogsApi - object-oriented interface
 * @export
 * @class AuditLogsApi
 * @extends {BaseAPI}
 */
export class AuditLogsApi extends BaseAPI {
    /**
     * This endpoint returns a portion of the audit logs, as well as paging information that can be used to navigate the audit log results.  This endpoint requires administrator access.  This endpoint uses keyset pagination. The [Keyset Pagination](../cookbook/pagination/#keyset-pagination) recipe in the RStudio Connect API Cookbook has example code for fetching multiple pages.
     * @summary Get audit logs
     * @param {number} [limit] Number of logs to return. The minimum supported value is 1 and maximum supported value is 500. Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough logs to satisfy the limit.
     * @param {string} [previous] Gets the previous page of audit logs relative to the given id.
     * @param {string} [next] Gets the next page of audit logs relative to the given id.
     * @param {boolean} [ascOrder] Whether the audit logs should be listed in ascending order
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuditLogsApi
     */
    public getAuditLogs(limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any) {
        return AuditLogsApiFp(this.configuration).getAuditLogs(limit, previous, next, ascOrder, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * BundlesApi - axios parameter creator
 * @export
 */
export const BundlesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
         * @summary Delete bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteBundle: async (guid: string, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deleteBundle.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteBundle.');
            }
            const localVarPath = `/v1/content/{guid}/bundles/{id}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/content/{guid}/bundles\" onclick=\"linkClick\">POST /v1/content/{guid}/bundles</a> endpoint for details about the construction of bundle archives.
         * @summary Download the bundle archive
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadBundle: async (guid: string, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling downloadBundle.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling downloadBundle.');
            }
            const localVarPath = `/v1/content/{guid}/bundles/{id}/download`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
         * @summary Get bundle details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundle: async (guid: string, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getBundle.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getBundle.');
            }
            const localVarPath = `/v1/content/{guid}/bundles/{id}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.
         * @summary List bundles
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundles: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getBundles.');
            }
            const localVarPath = `/v1/content/{guid}/bundles`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Create a new deployment bundle by uploading an archive.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  * All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies. * A bundle for a Shiny application includes an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application. * An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report. * Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The `manifest.json` file and primary source files like `app.R` or `index.Rmd` must be in the top level of the archived directory. Subirectories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory. This command will include all files in the subdirectory; check to ensure that this does not include extraneous files such as output files that you do not want in the bundle.  ```bash tar zcf bundle.tar.gz ./sales-analyzer ```  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
         * @summary Create a bundle by uploading an archive
         * @param {string} guid The unique identifier of the desired content item.
         * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
         * @param {string} [xContentChecksum] The MD5 sum of the archive file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadContentBundle: async (guid: string, archive: any, xContentChecksum?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling uploadContentBundle.');
            }
            // verify required parameter 'archive' is not null or undefined
            if (archive === null || archive === undefined) {
                throw new RequiredError('archive','Required parameter archive was null or undefined when calling uploadContentBundle.');
            }
            const localVarPath = `/v1/content/{guid}/bundles`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (xContentChecksum !== undefined && xContentChecksum !== null) {
                localVarHeaderParameter['X-Content-Checksum'] = String(xContentChecksum);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof archive !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(archive !== undefined ? archive : {})
                : (archive || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BundlesApi - functional programming interface
 * @export
 */
export const BundlesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
         * @summary Delete bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteBundle(guid: string, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await BundlesApiAxiosParamCreator(configuration).deleteBundle(guid, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/content/{guid}/bundles\" onclick=\"linkClick\">POST /v1/content/{guid}/bundles</a> endpoint for details about the construction of bundle archives.
         * @summary Download the bundle archive
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async downloadBundle(guid: string, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await BundlesApiAxiosParamCreator(configuration).downloadBundle(guid, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
         * @summary Get bundle details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBundle(guid: string, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Bundle>> {
            const localVarAxiosArgs = await BundlesApiAxiosParamCreator(configuration).getBundle(guid, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.
         * @summary List bundles
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBundles(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Bundle>>> {
            const localVarAxiosArgs = await BundlesApiAxiosParamCreator(configuration).getBundles(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create a new deployment bundle by uploading an archive.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  * All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies. * A bundle for a Shiny application includes an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application. * An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report. * Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The `manifest.json` file and primary source files like `app.R` or `index.Rmd` must be in the top level of the archived directory. Subirectories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory. This command will include all files in the subdirectory; check to ensure that this does not include extraneous files such as output files that you do not want in the bundle.  ```bash tar zcf bundle.tar.gz ./sales-analyzer ```  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
         * @summary Create a bundle by uploading an archive
         * @param {string} guid The unique identifier of the desired content item.
         * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
         * @param {string} [xContentChecksum] The MD5 sum of the archive file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadContentBundle(guid: string, archive: any, xContentChecksum?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Bundle>> {
            const localVarAxiosArgs = await BundlesApiAxiosParamCreator(configuration).uploadContentBundle(guid, archive, xContentChecksum, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * BundlesApi - factory interface
 * @export
 */
export const BundlesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
         * @summary Delete bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteBundle(guid: string, id: string, options?: any): AxiosPromise<void> {
            return BundlesApiFp(configuration).deleteBundle(guid, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/content/{guid}/bundles\" onclick=\"linkClick\">POST /v1/content/{guid}/bundles</a> endpoint for details about the construction of bundle archives.
         * @summary Download the bundle archive
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadBundle(guid: string, id: string, options?: any): AxiosPromise<any> {
            return BundlesApiFp(configuration).downloadBundle(guid, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
         * @summary Get bundle details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundle(guid: string, id: string, options?: any): AxiosPromise<Bundle> {
            return BundlesApiFp(configuration).getBundle(guid, id, options).then((request) => request(axios, basePath));
        },
        /**
         * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.
         * @summary List bundles
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundles(guid: string, options?: any): AxiosPromise<Array<Bundle>> {
            return BundlesApiFp(configuration).getBundles(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a new deployment bundle by uploading an archive.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  * All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies. * A bundle for a Shiny application includes an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application. * An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report. * Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The `manifest.json` file and primary source files like `app.R` or `index.Rmd` must be in the top level of the archived directory. Subirectories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory. This command will include all files in the subdirectory; check to ensure that this does not include extraneous files such as output files that you do not want in the bundle.  ```bash tar zcf bundle.tar.gz ./sales-analyzer ```  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
         * @summary Create a bundle by uploading an archive
         * @param {string} guid The unique identifier of the desired content item.
         * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
         * @param {string} [xContentChecksum] The MD5 sum of the archive file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadContentBundle(guid: string, archive: any, xContentChecksum?: string, options?: any): AxiosPromise<Bundle> {
            return BundlesApiFp(configuration).uploadContentBundle(guid, archive, xContentChecksum, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BundlesApi - object-oriented interface
 * @export
 * @class BundlesApi
 * @extends {BaseAPI}
 */
export class BundlesApi extends BaseAPI {
    /**
     * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
     * @summary Delete bundle
     * @param {string} guid The unique identifier of the desired content item.
     * @param {string} id The unique identifier of the desired bundle.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesApi
     */
    public deleteBundle(guid: string, id: string, options?: any) {
        return BundlesApiFp(this.configuration).deleteBundle(guid, id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/content/{guid}/bundles\" onclick=\"linkClick\">POST /v1/content/{guid}/bundles</a> endpoint for details about the construction of bundle archives.
     * @summary Download the bundle archive
     * @param {string} guid The unique identifier of the desired content item.
     * @param {string} id The unique identifier of the desired bundle.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesApi
     */
    public downloadBundle(guid: string, id: string, options?: any) {
        return BundlesApiFp(this.configuration).downloadBundle(guid, id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
     * @summary Get bundle details
     * @param {string} guid The unique identifier of the desired content item.
     * @param {string} id The unique identifier of the desired bundle.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesApi
     */
    public getBundle(guid: string, id: string, options?: any) {
        return BundlesApiFp(this.configuration).getBundle(guid, id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.
     * @summary List bundles
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesApi
     */
    public getBundles(guid: string, options?: any) {
        return BundlesApiFp(this.configuration).getBundles(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create a new deployment bundle by uploading an archive.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  * All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies. * A bundle for a Shiny application includes an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application. * An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report. * Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The `manifest.json` file and primary source files like `app.R` or `index.Rmd` must be in the top level of the archived directory. Subirectories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory. This command will include all files in the subdirectory; check to ensure that this does not include extraneous files such as output files that you do not want in the bundle.  ```bash tar zcf bundle.tar.gz ./sales-analyzer ```  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
     * @summary Create a bundle by uploading an archive
     * @param {string} guid The unique identifier of the desired content item.
     * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
     * @param {string} [xContentChecksum] The MD5 sum of the archive file.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesApi
     */
    public uploadContentBundle(guid: string, archive: any, xContentChecksum?: string, options?: any) {
        return BundlesApiFp(this.configuration).uploadContentBundle(guid, archive, xContentChecksum, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * BundlesV1ExperimentalApi - axios parameter creator
 * @export
 */
export const BundlesV1ExperimentalApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
         * @summary Delete bundle
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteBundle: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteBundle.');
            }
            const localVarPath = `/v1/experimental/bundles/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/experimental/content/{guid}/upload\" onclick=\"linkClick\">POST /v1/experimental/content/{guid}/upload</a> endpoint for details about the construction of bundle archives.
         * @summary Download the bundle archive
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadBundle: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling downloadBundle.');
            }
            const localVarPath = `/v1/experimental/bundles/{id}/download`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
         * @summary Get bundle details
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundle: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getBundle.');
            }
            const localVarPath = `/v1/experimental/bundles/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
         * @summary List bundles
         * @param {string} guid The unique identifier of the desired content item.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough bundles to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundles: async (guid: string, pageNumber?: number, pageSize?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getBundles.');
            }
            const localVarPath = `/v1/experimental/content/{guid}/bundles`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (pageNumber !== undefined) {
                localVarQueryParameter['page_number'] = pageNumber;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page_size'] = pageSize;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * BundlesV1ExperimentalApi - functional programming interface
 * @export
 */
export const BundlesV1ExperimentalApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
         * @summary Delete bundle
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteBundle(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await BundlesV1ExperimentalApiAxiosParamCreator(configuration).deleteBundle(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/experimental/content/{guid}/upload\" onclick=\"linkClick\">POST /v1/experimental/content/{guid}/upload</a> endpoint for details about the construction of bundle archives.
         * @summary Download the bundle archive
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async downloadBundle(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await BundlesV1ExperimentalApiAxiosParamCreator(configuration).downloadBundle(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
         * @summary Get bundle details
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBundle(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BundleV1Exp>> {
            const localVarAxiosArgs = await BundlesV1ExperimentalApiAxiosParamCreator(configuration).getBundle(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
         * @summary List bundles
         * @param {string} guid The unique identifier of the desired content item.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough bundles to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getBundles(guid: string, pageNumber?: number, pageSize?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BundlesV1Exp>> {
            const localVarAxiosArgs = await BundlesV1ExperimentalApiAxiosParamCreator(configuration).getBundles(guid, pageNumber, pageSize, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * BundlesV1ExperimentalApi - factory interface
 * @export
 */
export const BundlesV1ExperimentalApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
         * @summary Delete bundle
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteBundle(id: string, options?: any): AxiosPromise<void> {
            return BundlesV1ExperimentalApiFp(configuration).deleteBundle(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/experimental/content/{guid}/upload\" onclick=\"linkClick\">POST /v1/experimental/content/{guid}/upload</a> endpoint for details about the construction of bundle archives.
         * @summary Download the bundle archive
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        downloadBundle(id: string, options?: any): AxiosPromise<any> {
            return BundlesV1ExperimentalApiFp(configuration).downloadBundle(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
         * @summary Get bundle details
         * @param {string} id The unique identifier of the desired bundle.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundle(id: string, options?: any): AxiosPromise<BundleV1Exp> {
            return BundlesV1ExperimentalApiFp(configuration).getBundle(id, options).then((request) => request(axios, basePath));
        },
        /**
         * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
         * @summary List bundles
         * @param {string} guid The unique identifier of the desired content item.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough bundles to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getBundles(guid: string, pageNumber?: number, pageSize?: number, options?: any): AxiosPromise<BundlesV1Exp> {
            return BundlesV1ExperimentalApiFp(configuration).getBundles(guid, pageNumber, pageSize, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * BundlesV1ExperimentalApi - object-oriented interface
 * @export
 * @class BundlesV1ExperimentalApi
 * @extends {BaseAPI}
 */
export class BundlesV1ExperimentalApi extends BaseAPI {
    /**
     * Delete a specific bundle.  Bundle deletion is permitted by authorized clients with collaborator rights.  On-disk data and database records are removed as a consequence of this call. Deletion is not allowed while the bundle is still active.
     * @summary Delete bundle
     * @param {string} id The unique identifier of the desired bundle.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesV1ExperimentalApi
     */
    public deleteBundle(id: string, options?: any) {
        return BundlesV1ExperimentalApiFp(this.configuration).deleteBundle(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Download a deployment bundle.  Bundle download is permitted by authorized clients with collaborator rights.  Download a `gzip` compressed `tar` archive (`.tar.gz`) containing the code/data from one deployment of the associated content.  See the  <a href=\"#post-/v1/experimental/content/{guid}/upload\" onclick=\"linkClick\">POST /v1/experimental/content/{guid}/upload</a> endpoint for details about the construction of bundle archives.
     * @summary Download the bundle archive
     * @param {string} id The unique identifier of the desired bundle.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesV1ExperimentalApi
     */
    public downloadBundle(id: string, options?: any) {
        return BundlesV1ExperimentalApiFp(this.configuration).downloadBundle(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information about a specific bundle.  Bundle reads are permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.
     * @summary Get bundle details
     * @param {string} id The unique identifier of the desired bundle.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesV1ExperimentalApi
     */
    public getBundle(id: string, options?: any) {
        return BundlesV1ExperimentalApiFp(this.configuration).getBundle(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List bundles associated with a specific content item.  Bundle enumeration is permitted by all users with viewership rights to the content item. R and Python versions are populated for users with \"publisher\" and \"administrator\" role.  Results are sorted by ID.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
     * @summary List bundles
     * @param {string} guid The unique identifier of the desired content item.
     * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
     * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough bundles to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof BundlesV1ExperimentalApi
     */
    public getBundles(guid: string, pageNumber?: number, pageSize?: number, options?: any) {
        return BundlesV1ExperimentalApiFp(this.configuration).getBundles(guid, pageNumber, pageSize, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * ContentApi - axios parameter creator
 * @export
 */
export const ContentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
         * @summary Create content item
         * @param {InlineObject} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createContent: async (content: InlineObject, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'content' is not null or undefined
            if (content === null || content === undefined) {
                throw new RequiredError('content','Required parameter content was null or undefined when calling createContent.');
            }
            const localVarPath = `/v1/content`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof content !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(content !== undefined ? content : {})
                : (content || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
         * @summary Delete content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteContent: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deleteContent.');
            }
            const localVarPath = `/v1/content/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/tasks/{id}\" onclick=\"linkClick\">GET /v1/tasks/{id}</a> endpoint to track the progress of this task.
         * @summary Deploy deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject2} [instructions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deployContentBundle: async (guid: string, instructions?: InlineObject2, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deployContentBundle.');
            }
            const localVarPath = `/v1/content/{guid}/deploy`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof instructions !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(instructions !== undefined ? instructions : {})
                : (instructions || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary Get content details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContent: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getContent.');
            }
            const localVarPath = `/v1/content/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get the names of the environment variables defined for this content.  Since environment variables may contain sensitive information, the values are not included in the returned data.
         * @summary Get environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentEnvironment: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getContentEnvironment.');
            }
            const localVarPath = `/v1/content/{guid}/environment`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List all content items visible to the requesting user.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary List content items
         * @param {string} [ownerGuid] The unique identifier of the user who owns the content.
         * @param {string} [name] The content name specified when the content was created.  Note: content names are unique within the owning user\&#39;s account, so a request that specifies a non-empty name and owner_guid will return at most one content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContents: async (ownerGuid?: string, name?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/content`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (ownerGuid !== undefined) {
                localVarQueryParameter['owner_guid'] = ownerGuid;
            }

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Set the environment for this content item. Any existing environment variables will be removed, and the ones in the request will be set.
         * @summary Set all environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setContentEnvironment: async (guid: string, environment: Array<EnvironmentVariable>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling setContentEnvironment.');
            }
            // verify required parameter 'environment' is not null or undefined
            if (environment === null || environment === undefined) {
                throw new RequiredError('environment','Required parameter environment was null or undefined when calling setContentEnvironment.');
            }
            const localVarPath = `/v1/content/{guid}/environment`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof environment !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(environment !== undefined ? environment : {})
                : (environment || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.  Administrators can re-assign content ownership by updating the `owner_guid` field. The new owner must have collaborator rights.
         * @summary Update content
         * @param {string} guid The unique identifier of the content item to update.
         * @param {InlineObject1} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContent: async (guid: string, content: InlineObject1, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling updateContent.');
            }
            // verify required parameter 'content' is not null or undefined
            if (content === null || content === undefined) {
                throw new RequiredError('content','Required parameter content was null or undefined when calling updateContent.');
            }
            const localVarPath = `/v1/content/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof content !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(content !== undefined ? content : {})
                : (content || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Add, change, or delete environment variables for this content. Variables present in the request body will be set to the values provided. Variables with a value of `null` will be deleted. Variables not present in the request body will be left unchanged.
         * @summary Update environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContentEnvironment: async (guid: string, environment: Array<EnvironmentVariable>, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling updateContentEnvironment.');
            }
            // verify required parameter 'environment' is not null or undefined
            if (environment === null || environment === undefined) {
                throw new RequiredError('environment','Required parameter environment was null or undefined when calling updateContentEnvironment.');
            }
            const localVarPath = `/v1/content/{guid}/environment`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof environment !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(environment !== undefined ? environment : {})
                : (environment || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ContentApi - functional programming interface
 * @export
 */
export const ContentApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
         * @summary Create content item
         * @param {InlineObject} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createContent(content: InlineObject, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Content>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).createContent(content, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
         * @summary Delete content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteContent(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).deleteContent(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/tasks/{id}\" onclick=\"linkClick\">GET /v1/tasks/{id}</a> endpoint to track the progress of this task.
         * @summary Deploy deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject2} [instructions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deployContentBundle(guid: string, instructions?: InlineObject2, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse202>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).deployContentBundle(guid, instructions, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary Get content details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContent(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Content>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).getContent(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get the names of the environment variables defined for this content.  Since environment variables may contain sensitive information, the values are not included in the returned data.
         * @summary Get environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContentEnvironment(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<string>>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).getContentEnvironment(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all content items visible to the requesting user.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary List content items
         * @param {string} [ownerGuid] The unique identifier of the user who owns the content.
         * @param {string} [name] The content name specified when the content was created.  Note: content names are unique within the owning user\&#39;s account, so a request that specifies a non-empty name and owner_guid will return at most one content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContents(ownerGuid?: string, name?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Content>>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).getContents(ownerGuid, name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Set the environment for this content item. Any existing environment variables will be removed, and the ones in the request will be set.
         * @summary Set all environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async setContentEnvironment(guid: string, environment: Array<EnvironmentVariable>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<string>>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).setContentEnvironment(guid, environment, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.  Administrators can re-assign content ownership by updating the `owner_guid` field. The new owner must have collaborator rights.
         * @summary Update content
         * @param {string} guid The unique identifier of the content item to update.
         * @param {InlineObject1} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateContent(guid: string, content: InlineObject1, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Content>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).updateContent(guid, content, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Add, change, or delete environment variables for this content. Variables present in the request body will be set to the values provided. Variables with a value of `null` will be deleted. Variables not present in the request body will be left unchanged.
         * @summary Update environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateContentEnvironment(guid: string, environment: Array<EnvironmentVariable>, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<string>>> {
            const localVarAxiosArgs = await ContentApiAxiosParamCreator(configuration).updateContentEnvironment(guid, environment, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ContentApi - factory interface
 * @export
 */
export const ContentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
         * @summary Create content item
         * @param {InlineObject} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createContent(content: InlineObject, options?: any): AxiosPromise<Content> {
            return ContentApiFp(configuration).createContent(content, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
         * @summary Delete content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteContent(guid: string, options?: any): AxiosPromise<void> {
            return ContentApiFp(configuration).deleteContent(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/tasks/{id}\" onclick=\"linkClick\">GET /v1/tasks/{id}</a> endpoint to track the progress of this task.
         * @summary Deploy deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject2} [instructions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deployContentBundle(guid: string, instructions?: InlineObject2, options?: any): AxiosPromise<InlineResponse202> {
            return ContentApiFp(configuration).deployContentBundle(guid, instructions, options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary Get content details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContent(guid: string, options?: any): AxiosPromise<Content> {
            return ContentApiFp(configuration).getContent(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the names of the environment variables defined for this content.  Since environment variables may contain sensitive information, the values are not included in the returned data.
         * @summary Get environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentEnvironment(guid: string, options?: any): AxiosPromise<Array<string>> {
            return ContentApiFp(configuration).getContentEnvironment(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * List all content items visible to the requesting user.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary List content items
         * @param {string} [ownerGuid] The unique identifier of the user who owns the content.
         * @param {string} [name] The content name specified when the content was created.  Note: content names are unique within the owning user\&#39;s account, so a request that specifies a non-empty name and owner_guid will return at most one content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContents(ownerGuid?: string, name?: string, options?: any): AxiosPromise<Array<Content>> {
            return ContentApiFp(configuration).getContents(ownerGuid, name, options).then((request) => request(axios, basePath));
        },
        /**
         * Set the environment for this content item. Any existing environment variables will be removed, and the ones in the request will be set.
         * @summary Set all environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setContentEnvironment(guid: string, environment: Array<EnvironmentVariable>, options?: any): AxiosPromise<Array<string>> {
            return ContentApiFp(configuration).setContentEnvironment(guid, environment, options).then((request) => request(axios, basePath));
        },
        /**
         * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.  Administrators can re-assign content ownership by updating the `owner_guid` field. The new owner must have collaborator rights.
         * @summary Update content
         * @param {string} guid The unique identifier of the content item to update.
         * @param {InlineObject1} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContent(guid: string, content: InlineObject1, options?: any): AxiosPromise<Content> {
            return ContentApiFp(configuration).updateContent(guid, content, options).then((request) => request(axios, basePath));
        },
        /**
         * Add, change, or delete environment variables for this content. Variables present in the request body will be set to the values provided. Variables with a value of `null` will be deleted. Variables not present in the request body will be left unchanged.
         * @summary Update environment variables
         * @param {string} guid The unique identifier of the desired content item.
         * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContentEnvironment(guid: string, environment: Array<EnvironmentVariable>, options?: any): AxiosPromise<Array<string>> {
            return ContentApiFp(configuration).updateContentEnvironment(guid, environment, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ContentApi - object-oriented interface
 * @export
 * @class ContentApi
 * @extends {BaseAPI}
 */
export class ContentApi extends BaseAPI {
    /**
     * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
     * @summary Create content item
     * @param {InlineObject} content 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public createContent(content: InlineObject, options?: any) {
        return ContentApiFp(this.configuration).createContent(content, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
     * @summary Delete content
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public deleteContent(guid: string, options?: any) {
        return ContentApiFp(this.configuration).deleteContent(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/tasks/{id}\" onclick=\"linkClick\">GET /v1/tasks/{id}</a> endpoint to track the progress of this task.
     * @summary Deploy deployment bundle
     * @param {string} guid The unique identifier of the desired content item.
     * @param {InlineObject2} [instructions] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public deployContentBundle(guid: string, instructions?: InlineObject2, options?: any) {
        return ContentApiFp(this.configuration).deployContentBundle(guid, instructions, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
     * @summary Get content details
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public getContent(guid: string, options?: any) {
        return ContentApiFp(this.configuration).getContent(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get the names of the environment variables defined for this content.  Since environment variables may contain sensitive information, the values are not included in the returned data.
     * @summary Get environment variables
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public getContentEnvironment(guid: string, options?: any) {
        return ContentApiFp(this.configuration).getContentEnvironment(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all content items visible to the requesting user.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
     * @summary List content items
     * @param {string} [ownerGuid] The unique identifier of the user who owns the content.
     * @param {string} [name] The content name specified when the content was created.  Note: content names are unique within the owning user\&#39;s account, so a request that specifies a non-empty name and owner_guid will return at most one content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public getContents(ownerGuid?: string, name?: string, options?: any) {
        return ContentApiFp(this.configuration).getContents(ownerGuid, name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Set the environment for this content item. Any existing environment variables will be removed, and the ones in the request will be set.
     * @summary Set all environment variables
     * @param {string} guid The unique identifier of the desired content item.
     * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public setContentEnvironment(guid: string, environment: Array<EnvironmentVariable>, options?: any) {
        return ContentApiFp(this.configuration).setContentEnvironment(guid, environment, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.  Administrators can re-assign content ownership by updating the `owner_guid` field. The new owner must have collaborator rights.
     * @summary Update content
     * @param {string} guid The unique identifier of the content item to update.
     * @param {InlineObject1} content 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public updateContent(guid: string, content: InlineObject1, options?: any) {
        return ContentApiFp(this.configuration).updateContent(guid, content, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Add, change, or delete environment variables for this content. Variables present in the request body will be set to the values provided. Variables with a value of `null` will be deleted. Variables not present in the request body will be left unchanged.
     * @summary Update environment variables
     * @param {string} guid The unique identifier of the desired content item.
     * @param {Array<EnvironmentVariable>} environment The environment definition to apply to this content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentApi
     */
    public updateContentEnvironment(guid: string, environment: Array<EnvironmentVariable>, options?: any) {
        return ContentApiFp(this.configuration).updateContentEnvironment(guid, environment, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * ContentPermissionsApi - axios parameter creator
 * @export
 */
export const ContentPermissionsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Add a user or group to the permissions for this content item.
         * @summary Add permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject3} permission 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addContentPermission: async (guid: string, permission: InlineObject3, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling addContentPermission.');
            }
            // verify required parameter 'permission' is not null or undefined
            if (permission === null || permission === undefined) {
                throw new RequiredError('permission','Required parameter permission was null or undefined when calling addContentPermission.');
            }
            const localVarPath = `/v1/content/{guid}/permissions`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof permission !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(permission !== undefined ? permission : {})
                : (permission || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a single permission entry for the content item, given its ID.
         * @summary Delete permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteContentPermission: async (guid: string, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deleteContentPermission.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteContentPermission.');
            }
            const localVarPath = `/v1/content/{guid}/permissions/{id}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get a single permission entry for the content item, given its ID.
         * @summary Get permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentPermission: async (guid: string, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getContentPermission.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getContentPermission.');
            }
            const localVarPath = `/v1/content/{guid}/permissions/{id}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List the permissions for this content item. There will be one permission item for each user or group listed in the ACL for this content item.
         * @summary List permissions
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listContentPermissions: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling listContentPermissions.');
            }
            const localVarPath = `/v1/content/{guid}/permissions`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update a permission entry for this content item.
         * @summary Update permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry to update.
         * @param {InlineObject4} permission 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContentPermission: async (guid: string, id: string, permission: InlineObject4, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling updateContentPermission.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateContentPermission.');
            }
            // verify required parameter 'permission' is not null or undefined
            if (permission === null || permission === undefined) {
                throw new RequiredError('permission','Required parameter permission was null or undefined when calling updateContentPermission.');
            }
            const localVarPath = `/v1/content/{guid}/permissions/{id}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof permission !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(permission !== undefined ? permission : {})
                : (permission || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ContentPermissionsApi - functional programming interface
 * @export
 */
export const ContentPermissionsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Add a user or group to the permissions for this content item.
         * @summary Add permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject3} permission 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addContentPermission(guid: string, permission: InlineObject3, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Permission>> {
            const localVarAxiosArgs = await ContentPermissionsApiAxiosParamCreator(configuration).addContentPermission(guid, permission, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a single permission entry for the content item, given its ID.
         * @summary Delete permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteContentPermission(guid: string, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContentPermissionsApiAxiosParamCreator(configuration).deleteContentPermission(guid, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get a single permission entry for the content item, given its ID.
         * @summary Get permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContentPermission(guid: string, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Permission>> {
            const localVarAxiosArgs = await ContentPermissionsApiAxiosParamCreator(configuration).getContentPermission(guid, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List the permissions for this content item. There will be one permission item for each user or group listed in the ACL for this content item.
         * @summary List permissions
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listContentPermissions(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Permission>>> {
            const localVarAxiosArgs = await ContentPermissionsApiAxiosParamCreator(configuration).listContentPermissions(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update a permission entry for this content item.
         * @summary Update permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry to update.
         * @param {InlineObject4} permission 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateContentPermission(guid: string, id: string, permission: InlineObject4, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Permission>> {
            const localVarAxiosArgs = await ContentPermissionsApiAxiosParamCreator(configuration).updateContentPermission(guid, id, permission, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ContentPermissionsApi - factory interface
 * @export
 */
export const ContentPermissionsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Add a user or group to the permissions for this content item.
         * @summary Add permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject3} permission 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addContentPermission(guid: string, permission: InlineObject3, options?: any): AxiosPromise<Permission> {
            return ContentPermissionsApiFp(configuration).addContentPermission(guid, permission, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a single permission entry for the content item, given its ID.
         * @summary Delete permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteContentPermission(guid: string, id: string, options?: any): AxiosPromise<void> {
            return ContentPermissionsApiFp(configuration).deleteContentPermission(guid, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get a single permission entry for the content item, given its ID.
         * @summary Get permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentPermission(guid: string, id: string, options?: any): AxiosPromise<Permission> {
            return ContentPermissionsApiFp(configuration).getContentPermission(guid, id, options).then((request) => request(axios, basePath));
        },
        /**
         * List the permissions for this content item. There will be one permission item for each user or group listed in the ACL for this content item.
         * @summary List permissions
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listContentPermissions(guid: string, options?: any): AxiosPromise<Array<Permission>> {
            return ContentPermissionsApiFp(configuration).listContentPermissions(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Update a permission entry for this content item.
         * @summary Update permission
         * @param {string} guid The unique identifier of the desired content item.
         * @param {string} id The unique identifier of the permission entry to update.
         * @param {InlineObject4} permission 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContentPermission(guid: string, id: string, permission: InlineObject4, options?: any): AxiosPromise<Permission> {
            return ContentPermissionsApiFp(configuration).updateContentPermission(guid, id, permission, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ContentPermissionsApi - object-oriented interface
 * @export
 * @class ContentPermissionsApi
 * @extends {BaseAPI}
 */
export class ContentPermissionsApi extends BaseAPI {
    /**
     * Add a user or group to the permissions for this content item.
     * @summary Add permission
     * @param {string} guid The unique identifier of the desired content item.
     * @param {InlineObject3} permission 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentPermissionsApi
     */
    public addContentPermission(guid: string, permission: InlineObject3, options?: any) {
        return ContentPermissionsApiFp(this.configuration).addContentPermission(guid, permission, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete a single permission entry for the content item, given its ID.
     * @summary Delete permission
     * @param {string} guid The unique identifier of the desired content item.
     * @param {string} id The unique identifier of the permission entry.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentPermissionsApi
     */
    public deleteContentPermission(guid: string, id: string, options?: any) {
        return ContentPermissionsApiFp(this.configuration).deleteContentPermission(guid, id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get a single permission entry for the content item, given its ID.
     * @summary Get permission
     * @param {string} guid The unique identifier of the desired content item.
     * @param {string} id The unique identifier of the permission entry.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentPermissionsApi
     */
    public getContentPermission(guid: string, id: string, options?: any) {
        return ContentPermissionsApiFp(this.configuration).getContentPermission(guid, id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List the permissions for this content item. There will be one permission item for each user or group listed in the ACL for this content item.
     * @summary List permissions
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentPermissionsApi
     */
    public listContentPermissions(guid: string, options?: any) {
        return ContentPermissionsApiFp(this.configuration).listContentPermissions(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update a permission entry for this content item.
     * @summary Update permission
     * @param {string} guid The unique identifier of the desired content item.
     * @param {string} id The unique identifier of the permission entry to update.
     * @param {InlineObject4} permission 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentPermissionsApi
     */
    public updateContentPermission(guid: string, id: string, permission: InlineObject4, options?: any) {
        return ContentPermissionsApiFp(this.configuration).updateContentPermission(guid, id, permission, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * ContentV1ExperimentalApi - axios parameter creator
 * @export
 */
export const ContentV1ExperimentalApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
         * @summary Create content item
         * @param {InlineObject7} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createContent: async (content: InlineObject7, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'content' is not null or undefined
            if (content === null || content === undefined) {
                throw new RequiredError('content','Required parameter content was null or undefined when calling createContent.');
            }
            const localVarPath = `/v1/experimental/content`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof content !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(content !== undefined ? content : {})
                : (content || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
         * @summary Delete content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteContent: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deleteContent.');
            }
            const localVarPath = `/v1/experimental/content/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/experimental/tasks/{id}\" onclick=\"linkClick\">GET /v1/experimental/tasks/{id}</a> endpoint to track the progress of this task.
         * @summary Deploy deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject9} [instructions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deployContentBundle: async (guid: string, instructions?: InlineObject9, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deployContentBundle.');
            }
            const localVarPath = `/v1/experimental/content/{guid}/deploy`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof instructions !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(instructions !== undefined ? instructions : {})
                : (instructions || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary Get content details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContent: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getContent.');
            }
            const localVarPath = `/v1/experimental/content/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.
         * @summary Update content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject8} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContent: async (guid: string, content: InlineObject8, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling updateContent.');
            }
            // verify required parameter 'content' is not null or undefined
            if (content === null || content === undefined) {
                throw new RequiredError('content','Required parameter content was null or undefined when calling updateContent.');
            }
            const localVarPath = `/v1/experimental/content/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof content !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(content !== undefined ? content : {})
                : (content || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Upload a new deployment bundle.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies.  A bundle for a Shiny application include an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application.  An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report.  Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The archive paths for the `manifest.json` file and primary source files like `app.R` or `index.Rmd` must not specify a directory structure. Directories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory.  ```bash tar -C sales-analyzer zcf bundle.tar.gz . ```  Both `tar` commands will produce an archive with the `manifest.json` and `app.R` at the top-most level.  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
         * @summary Upload deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
         * @param {string} [xContentChecksum] The MD5 sum of the archive file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadContentBundle: async (guid: string, archive: any, xContentChecksum?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling uploadContentBundle.');
            }
            // verify required parameter 'archive' is not null or undefined
            if (archive === null || archive === undefined) {
                throw new RequiredError('archive','Required parameter archive was null or undefined when calling uploadContentBundle.');
            }
            const localVarPath = `/v1/experimental/content/{guid}/upload`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (xContentChecksum !== undefined && xContentChecksum !== null) {
                localVarHeaderParameter['X-Content-Checksum'] = String(xContentChecksum);
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof archive !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(archive !== undefined ? archive : {})
                : (archive || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ContentV1ExperimentalApi - functional programming interface
 * @export
 */
export const ContentV1ExperimentalApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
         * @summary Create content item
         * @param {InlineObject7} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createContent(content: InlineObject7, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContentV1Exp>> {
            const localVarAxiosArgs = await ContentV1ExperimentalApiAxiosParamCreator(configuration).createContent(content, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
         * @summary Delete content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteContent(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ContentV1ExperimentalApiAxiosParamCreator(configuration).deleteContent(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/experimental/tasks/{id}\" onclick=\"linkClick\">GET /v1/experimental/tasks/{id}</a> endpoint to track the progress of this task.
         * @summary Deploy deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject9} [instructions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deployContentBundle(guid: string, instructions?: InlineObject9, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2002>> {
            const localVarAxiosArgs = await ContentV1ExperimentalApiAxiosParamCreator(configuration).deployContentBundle(guid, instructions, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary Get content details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContent(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContentV1Exp>> {
            const localVarAxiosArgs = await ContentV1ExperimentalApiAxiosParamCreator(configuration).getContent(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.
         * @summary Update content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject8} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateContent(guid: string, content: InlineObject8, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContentV1Exp>> {
            const localVarAxiosArgs = await ContentV1ExperimentalApiAxiosParamCreator(configuration).updateContent(guid, content, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Upload a new deployment bundle.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies.  A bundle for a Shiny application include an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application.  An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report.  Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The archive paths for the `manifest.json` file and primary source files like `app.R` or `index.Rmd` must not specify a directory structure. Directories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory.  ```bash tar -C sales-analyzer zcf bundle.tar.gz . ```  Both `tar` commands will produce an archive with the `manifest.json` and `app.R` at the top-most level.  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
         * @summary Upload deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
         * @param {string} [xContentChecksum] The MD5 sum of the archive file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async uploadContentBundle(guid: string, archive: any, xContentChecksum?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2003>> {
            const localVarAxiosArgs = await ContentV1ExperimentalApiAxiosParamCreator(configuration).uploadContentBundle(guid, archive, xContentChecksum, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ContentV1ExperimentalApi - factory interface
 * @export
 */
export const ContentV1ExperimentalApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
         * @summary Create content item
         * @param {InlineObject7} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createContent(content: InlineObject7, options?: any): AxiosPromise<ContentV1Exp> {
            return ContentV1ExperimentalApiFp(configuration).createContent(content, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
         * @summary Delete content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteContent(guid: string, options?: any): AxiosPromise<void> {
            return ContentV1ExperimentalApiFp(configuration).deleteContent(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/experimental/tasks/{id}\" onclick=\"linkClick\">GET /v1/experimental/tasks/{id}</a> endpoint to track the progress of this task.
         * @summary Deploy deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject9} [instructions] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deployContentBundle(guid: string, instructions?: InlineObject9, options?: any): AxiosPromise<InlineResponse2002> {
            return ContentV1ExperimentalApiFp(configuration).deployContentBundle(guid, instructions, options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary Get content details
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContent(guid: string, options?: any): AxiosPromise<ContentV1Exp> {
            return ContentV1ExperimentalApiFp(configuration).getContent(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.
         * @summary Update content
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject8} content 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateContent(guid: string, content: InlineObject8, options?: any): AxiosPromise<ContentV1Exp> {
            return ContentV1ExperimentalApiFp(configuration).updateContent(guid, content, options).then((request) => request(axios, basePath));
        },
        /**
         * Upload a new deployment bundle.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies.  A bundle for a Shiny application include an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application.  An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report.  Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The archive paths for the `manifest.json` file and primary source files like `app.R` or `index.Rmd` must not specify a directory structure. Directories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory.  ```bash tar -C sales-analyzer zcf bundle.tar.gz . ```  Both `tar` commands will produce an archive with the `manifest.json` and `app.R` at the top-most level.  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
         * @summary Upload deployment bundle
         * @param {string} guid The unique identifier of the desired content item.
         * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
         * @param {string} [xContentChecksum] The MD5 sum of the archive file.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        uploadContentBundle(guid: string, archive: any, xContentChecksum?: string, options?: any): AxiosPromise<InlineResponse2003> {
            return ContentV1ExperimentalApiFp(configuration).uploadContentBundle(guid, archive, xContentChecksum, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ContentV1ExperimentalApi - object-oriented interface
 * @export
 * @class ContentV1ExperimentalApi
 * @extends {BaseAPI}
 */
export class ContentV1ExperimentalApi extends BaseAPI {
    /**
     * Create a new content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.
     * @summary Create content item
     * @param {InlineObject7} content 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentV1ExperimentalApi
     */
    public createContent(content: InlineObject7, options?: any) {
        return ContentV1ExperimentalApiFp(this.configuration).createContent(content, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete a specific content item.  On-disk data and database records are removed as a consequence of this call.
     * @summary Delete content
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentV1ExperimentalApi
     */
    public deleteContent(guid: string, options?: any) {
        return ContentV1ExperimentalApiFp(this.configuration).deleteContent(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deploy (activate) a deployment bundle.  Deployment requests spawn an asynchronous task to make your previously uploaded data available for serving. The workflow applied to the bundled files varies depending on the type of content.  Executable content has its environment reconstructed. This includes using the `packrat` R package to install R package dependencies.  Documents (R Markdown reports, Jupyter Notebooks) are rendered and the result made available.  Interactive content (Shiny applications, Plumber APIs) available to be launched on the next client visit.  The deployment workflow for static content (HTML, plots) is lighter-weight than for executable content. File time-stamps are updated to ensure that browsers do not cache previous results and instead see the newly promoted files.  The response from this endpoint includes a task identifier. Poll the <a href=\"#get-/v1/experimental/tasks/{id}\" onclick=\"linkClick\">GET /v1/experimental/tasks/{id}</a> endpoint to track the progress of this task.
     * @summary Deploy deployment bundle
     * @param {string} guid The unique identifier of the desired content item.
     * @param {InlineObject9} [instructions] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentV1ExperimentalApi
     */
    public deployContentBundle(guid: string, instructions?: InlineObject9, options?: any) {
        return ContentV1ExperimentalApiFp(this.configuration).deployContentBundle(guid, instructions, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information about a specific content item.  Unauthenticated clients are rejected regardless of the content access type.  Authorized, non-administrator clients without viewership rights to this content are rejected.  Authorized, administrator clients without viewership rights are permitted to obtain information about this content. The computed `role` for these users will be `none`, representing that these users cannot view the content itself.  Authorized clients with viewership (or collaborator) rights are permitted to obtain information about this content. The computed `role` for these users will reflect the level of access.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
     * @summary Get content details
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentV1ExperimentalApi
     */
    public getContent(guid: string, options?: any) {
        return ContentV1ExperimentalApiFp(this.configuration).getContent(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update fields for a specific content item.  Authenticated access from a user having either \"publisher\" or \"administrator\" role is allowed. All other clients are rejected.  Authorized clients with collaborator or administrator rights are permitted to modify content item fields.
     * @summary Update content
     * @param {string} guid The unique identifier of the desired content item.
     * @param {InlineObject8} content 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentV1ExperimentalApi
     */
    public updateContent(guid: string, content: InlineObject8, options?: any) {
        return ContentV1ExperimentalApiFp(this.configuration).updateContent(guid, content, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Upload a new deployment bundle.  Upload a compressed `tar` archive containing code/data that represent one deployment of this content. Bundles must be `gzip` compressed `tar` archives.  All deployment bundles include a `manifest.json` describing the contained files and their runtime dependencies.  A bundle for a Shiny application include an `app.R` or `ui.R` and `server.R`, and any images or data files required by the application.  An R Markdown document bundle includes the `index.Rmd` file along with any R scripts and data files needed to render the report.  Bundles containing HTML content would include the CSS, Javascript, and images required by that document.  The archive paths for the `manifest.json` file and primary source files like `app.R` or `index.Rmd` must not specify a directory structure. Directories may be used for secondary data and scripts.  Here is how you might use `tar` to create an archive for a Shiny application. It includes the manifest, the application, and an image.  ```bash tar zcf bundle.tar.gz ./manifest.json ./app.R ./www/logo.png ```  Here is another example of creating a bundle for that same application but from its parent directory. The Shiny application is in a `sales-analyzer` sub-directory.  ```bash tar -C sales-analyzer zcf bundle.tar.gz . ```  Both `tar` commands will produce an archive with the `manifest.json` and `app.R` at the top-most level.  Publishers with collaborator rights to this content (including the owner) are permitted to upload deployment bundles. Users without these rights are rejected.  Administrators must be a collaborator for a content item before they receive upload rights.
     * @summary Upload deployment bundle
     * @param {string} guid The unique identifier of the desired content item.
     * @param {any} archive A &#x60;gzip&#x60; compressed &#x60;tar&#x60; archive file.
     * @param {string} [xContentChecksum] The MD5 sum of the archive file.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentV1ExperimentalApi
     */
    public uploadContentBundle(guid: string, archive: any, xContentChecksum?: string, options?: any) {
        return ContentV1ExperimentalApiFp(this.configuration).uploadContentBundle(guid, archive, xContentChecksum, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * GroupsApi - axios parameter creator
 * @export
 */
export const GroupsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This endpoint adds a user to a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to modify a group you do   not own.
         * @summary Add a group member
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {InlineObject12} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addGroupMember: async (groupGuid: string, user: InlineObject12, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'groupGuid' is not null or undefined
            if (groupGuid === null || groupGuid === undefined) {
                throw new RequiredError('groupGuid','Required parameter groupGuid was null or undefined when calling addGroupMember.');
            }
            // verify required parameter 'user' is not null or undefined
            if (user === null || user === undefined) {
                throw new RequiredError('user','Required parameter user was null or undefined when calling addGroupMember.');
            }
            const localVarPath = `/v1/groups/{group_guid}/members`
                .replace(`{${"group_guid"}}`, encodeURIComponent(String(groupGuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof user !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(user !== undefined ? user : {})
                : (user || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint creates the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to create   groups.
         * @summary Create a group from caller-supplied details (Password, PAM, OAuth2, SAML, Proxied) 
         * @param {InlineObject11} group 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createGroup: async (group: InlineObject11, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'group' is not null or undefined
            if (group === null || group === undefined) {
                throw new RequiredError('group','Required parameter group was null or undefined when calling createGroup.');
            }
            const localVarPath = `/v1/groups`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof group !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(group !== undefined ? group : {})
                : (group || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint creates the given group on the RStudio Connect server.  - This endpoint is used only for LDAP authentication. Password,   PAM, SAML, OAuth2 and Proxied authentication providers should   use the    <a href=\"#post-/v1/groups\" onclick=\"linkClick\">POST /v1/groups</a>   endpoint. - Publisher or administrator access is required to access this   endpoint. - Group members will be automatically populated from the LDAP server.  #### Group Creation Workflow on LDAP  The API lets you identify an existing group in the LDAP system and create a corresponding group on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/groups/remote\" onclick=\"linkClick\">GET /v1/groups/remote</a>   endpoint. This endpoint will return a list of potential   matching groups in LDAP. A group that does not exist in   RStudio Connect will lack a `guid`. Note the `temp_ticket`   for the desired group. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding group on RStudio Connect.  The [Create a Group from LDAP](../cookbook/groups/#create-group-ldap) recipe in the API Cookbook has sample code using this workflow.
         * @summary Create a group using details from a remote authentication provider (LDAP) 
         * @param {InlineObject10} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRemoteGroup: async (request: InlineObject10, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling createRemoteGroup.');
            }
            const localVarPath = `/v1/groups`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof request !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(request !== undefined ? request : {})
                : (request || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Delete the given group.  - This endpoint can be used only when groups are enabled in   RStudio Connnect and will return an error otherwise. - Administrator access is required to delete a group you do   not own.
         * @summary Delete a group
         * @param {string} guid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteGroup: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deleteGroup.');
            }
            const localVarPath = `/v1/groups/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information on a specific group.  This endpoint is available only when groups are enabled in RStudio Connect.
         * @summary Get group details
         * @param {string} guid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGroup: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getGroup.');
            }
            const localVarPath = `/v1/groups/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint gets the group member details. Group member enumeration is currently not supported for LDAP.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled.
         * @summary Get group member details
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGroupMembers: async (groupGuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'groupGuid' is not null or undefined
            if (groupGuid === null || groupGuid === undefined) {
                throw new RequiredError('groupGuid','Required parameter groupGuid was null or undefined when calling getGroupMembers.');
            }
            const localVarPath = `/v1/groups/{group_guid}/members`
                .replace(`{${"group_guid"}}`, encodeURIComponent(String(groupGuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint lists or searches for local groups.  - For a `prefix` search, results are sorted based on   similarity to the `prefix`. A `prefix` search ignores   `asc_order`. The first page of results will always be   returned. - The `prefix` can also be an exact match for the   group\'s DN (for LDAP) or the auth provider\'s unique ID   for the group, if any. - For a non-`prefix` search, results are sorted by group name.  This endpoint is available only when groups are enabled in RStudio Connect and it will return an error otherwise.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
         * @summary List or search for group details
         * @param {string} [prefix] Filters groups by prefix (group name). The filter is case insensitive.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned. For a &#x60;prefix&#x60; search, the first page of results will always be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough groups to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {boolean} [ascOrder] Whether or not to return the groups in ascending order, sorted by name. For a &#x60;prefix&#x60; search, results are sorted first by exact match, then by increasing word length.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGroups: async (prefix?: string, pageNumber?: number, pageSize?: number, ascOrder?: boolean, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/groups`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (prefix !== undefined) {
                localVarQueryParameter['prefix'] = prefix;
            }

            if (pageNumber !== undefined) {
                localVarQueryParameter['page_number'] = pageNumber;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page_size'] = pageSize;
            }

            if (ascOrder !== undefined) {
                localVarQueryParameter['asc_order'] = ascOrder;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint removes a user from a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to remove a user from a   group you do not own, but no special access is needed to   remove yourself from a group.
         * @summary Remove a group member
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {string} userGuid The group member\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeGroupMember: async (groupGuid: string, userGuid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'groupGuid' is not null or undefined
            if (groupGuid === null || groupGuid === undefined) {
                throw new RequiredError('groupGuid','Required parameter groupGuid was null or undefined when calling removeGroupMember.');
            }
            // verify required parameter 'userGuid' is not null or undefined
            if (userGuid === null || userGuid === undefined) {
                throw new RequiredError('userGuid','Required parameter userGuid was null or undefined when calling removeGroupMember.');
            }
            const localVarPath = `/v1/groups/{group_guid}/members/{user_guid}`
                .replace(`{${"group_guid"}}`, encodeURIComponent(String(groupGuid)))
                .replace(`{${"user_guid"}}`, encodeURIComponent(String(userGuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint is used to support operations against groups not managed by Connect, such as  <a href=\"#post-/v1/groups\" onclick=\"linkClick\">creating LDAP groups</a> See <a href=\"#get-/v1/groups\" onclick=\"linkClick\">GET /v1/groups</a> for listing groups on RStudio Connect.  This endpoint searches for groups on RStudio Connect and on your LDAP system.  Results are sorted based on similarity to the `prefix`.  - This endpoint can be used only by LDAP authentication and   will return an error otherwise. - Publisher or administrator access is required to access this   endpoint.
         * @summary Search for group details from a remote provider
         * @param {string} prefix Search groups by prefix. &#x60;prefix&#x60; is case insensitive.
         * @param {number} [limit] The maximum number of groups to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchRemoteGroups: async (prefix: string, limit?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'prefix' is not null or undefined
            if (prefix === null || prefix === undefined) {
                throw new RequiredError('prefix','Required parameter prefix was null or undefined when calling searchRemoteGroups.');
            }
            const localVarPath = `/v1/groups/remote`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (prefix !== undefined) {
                localVarQueryParameter['prefix'] = prefix;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint modifies the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to modify   groups.
         * @summary Modify a group name or owner (Password, PAM, OAuth2, SAML, Proxied) 
         * @param {string} guid The group\&#39;s unique identifier
         * @param {InlineObject13} group 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateGroup: async (guid: string, group: InlineObject13, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling updateGroup.');
            }
            // verify required parameter 'group' is not null or undefined
            if (group === null || group === undefined) {
                throw new RequiredError('group','Required parameter group was null or undefined when calling updateGroup.');
            }
            const localVarPath = `/v1/groups/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof group !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(group !== undefined ? group : {})
                : (group || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GroupsApi - functional programming interface
 * @export
 */
export const GroupsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * This endpoint adds a user to a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to modify a group you do   not own.
         * @summary Add a group member
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {InlineObject12} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addGroupMember(groupGuid: string, user: InlineObject12, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).addGroupMember(groupGuid, user, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint creates the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to create   groups.
         * @summary Create a group from caller-supplied details (Password, PAM, OAuth2, SAML, Proxied) 
         * @param {InlineObject11} group 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createGroup(group: InlineObject11, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Group>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).createGroup(group, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint creates the given group on the RStudio Connect server.  - This endpoint is used only for LDAP authentication. Password,   PAM, SAML, OAuth2 and Proxied authentication providers should   use the    <a href=\"#post-/v1/groups\" onclick=\"linkClick\">POST /v1/groups</a>   endpoint. - Publisher or administrator access is required to access this   endpoint. - Group members will be automatically populated from the LDAP server.  #### Group Creation Workflow on LDAP  The API lets you identify an existing group in the LDAP system and create a corresponding group on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/groups/remote\" onclick=\"linkClick\">GET /v1/groups/remote</a>   endpoint. This endpoint will return a list of potential   matching groups in LDAP. A group that does not exist in   RStudio Connect will lack a `guid`. Note the `temp_ticket`   for the desired group. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding group on RStudio Connect.  The [Create a Group from LDAP](../cookbook/groups/#create-group-ldap) recipe in the API Cookbook has sample code using this workflow.
         * @summary Create a group using details from a remote authentication provider (LDAP) 
         * @param {InlineObject10} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createRemoteGroup(request: InlineObject10, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Group>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).createRemoteGroup(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Delete the given group.  - This endpoint can be used only when groups are enabled in   RStudio Connnect and will return an error otherwise. - Administrator access is required to delete a group you do   not own.
         * @summary Delete a group
         * @param {string} guid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteGroup(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).deleteGroup(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information on a specific group.  This endpoint is available only when groups are enabled in RStudio Connect.
         * @summary Get group details
         * @param {string} guid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGroup(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Group>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).getGroup(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint gets the group member details. Group member enumeration is currently not supported for LDAP.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled.
         * @summary Get group member details
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGroupMembers(groupGuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GroupMembers>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).getGroupMembers(groupGuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint lists or searches for local groups.  - For a `prefix` search, results are sorted based on   similarity to the `prefix`. A `prefix` search ignores   `asc_order`. The first page of results will always be   returned. - The `prefix` can also be an exact match for the   group\'s DN (for LDAP) or the auth provider\'s unique ID   for the group, if any. - For a non-`prefix` search, results are sorted by group name.  This endpoint is available only when groups are enabled in RStudio Connect and it will return an error otherwise.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
         * @summary List or search for group details
         * @param {string} [prefix] Filters groups by prefix (group name). The filter is case insensitive.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned. For a &#x60;prefix&#x60; search, the first page of results will always be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough groups to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {boolean} [ascOrder] Whether or not to return the groups in ascending order, sorted by name. For a &#x60;prefix&#x60; search, results are sorted first by exact match, then by increasing word length.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getGroups(prefix?: string, pageNumber?: number, pageSize?: number, ascOrder?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Groups>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).getGroups(prefix, pageNumber, pageSize, ascOrder, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint removes a user from a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to remove a user from a   group you do not own, but no special access is needed to   remove yourself from a group.
         * @summary Remove a group member
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {string} userGuid The group member\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeGroupMember(groupGuid: string, userGuid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).removeGroupMember(groupGuid, userGuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint is used to support operations against groups not managed by Connect, such as  <a href=\"#post-/v1/groups\" onclick=\"linkClick\">creating LDAP groups</a> See <a href=\"#get-/v1/groups\" onclick=\"linkClick\">GET /v1/groups</a> for listing groups on RStudio Connect.  This endpoint searches for groups on RStudio Connect and on your LDAP system.  Results are sorted based on similarity to the `prefix`.  - This endpoint can be used only by LDAP authentication and   will return an error otherwise. - Publisher or administrator access is required to access this   endpoint.
         * @summary Search for group details from a remote provider
         * @param {string} prefix Search groups by prefix. &#x60;prefix&#x60; is case insensitive.
         * @param {number} [limit] The maximum number of groups to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchRemoteGroups(prefix: string, limit?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GroupRemoteSearch>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).searchRemoteGroups(prefix, limit, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint modifies the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to modify   groups.
         * @summary Modify a group name or owner (Password, PAM, OAuth2, SAML, Proxied) 
         * @param {string} guid The group\&#39;s unique identifier
         * @param {InlineObject13} group 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateGroup(guid: string, group: InlineObject13, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Group>> {
            const localVarAxiosArgs = await GroupsApiAxiosParamCreator(configuration).updateGroup(guid, group, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * GroupsApi - factory interface
 * @export
 */
export const GroupsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * This endpoint adds a user to a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to modify a group you do   not own.
         * @summary Add a group member
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {InlineObject12} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addGroupMember(groupGuid: string, user: InlineObject12, options?: any): AxiosPromise<void> {
            return GroupsApiFp(configuration).addGroupMember(groupGuid, user, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint creates the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to create   groups.
         * @summary Create a group from caller-supplied details (Password, PAM, OAuth2, SAML, Proxied) 
         * @param {InlineObject11} group 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createGroup(group: InlineObject11, options?: any): AxiosPromise<Group> {
            return GroupsApiFp(configuration).createGroup(group, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint creates the given group on the RStudio Connect server.  - This endpoint is used only for LDAP authentication. Password,   PAM, SAML, OAuth2 and Proxied authentication providers should   use the    <a href=\"#post-/v1/groups\" onclick=\"linkClick\">POST /v1/groups</a>   endpoint. - Publisher or administrator access is required to access this   endpoint. - Group members will be automatically populated from the LDAP server.  #### Group Creation Workflow on LDAP  The API lets you identify an existing group in the LDAP system and create a corresponding group on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/groups/remote\" onclick=\"linkClick\">GET /v1/groups/remote</a>   endpoint. This endpoint will return a list of potential   matching groups in LDAP. A group that does not exist in   RStudio Connect will lack a `guid`. Note the `temp_ticket`   for the desired group. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding group on RStudio Connect.  The [Create a Group from LDAP](../cookbook/groups/#create-group-ldap) recipe in the API Cookbook has sample code using this workflow.
         * @summary Create a group using details from a remote authentication provider (LDAP) 
         * @param {InlineObject10} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createRemoteGroup(request: InlineObject10, options?: any): AxiosPromise<Group> {
            return GroupsApiFp(configuration).createRemoteGroup(request, options).then((request) => request(axios, basePath));
        },
        /**
         * Delete the given group.  - This endpoint can be used only when groups are enabled in   RStudio Connnect and will return an error otherwise. - Administrator access is required to delete a group you do   not own.
         * @summary Delete a group
         * @param {string} guid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteGroup(guid: string, options?: any): AxiosPromise<void> {
            return GroupsApiFp(configuration).deleteGroup(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information on a specific group.  This endpoint is available only when groups are enabled in RStudio Connect.
         * @summary Get group details
         * @param {string} guid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGroup(guid: string, options?: any): AxiosPromise<Group> {
            return GroupsApiFp(configuration).getGroup(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint gets the group member details. Group member enumeration is currently not supported for LDAP.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled.
         * @summary Get group member details
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGroupMembers(groupGuid: string, options?: any): AxiosPromise<GroupMembers> {
            return GroupsApiFp(configuration).getGroupMembers(groupGuid, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint lists or searches for local groups.  - For a `prefix` search, results are sorted based on   similarity to the `prefix`. A `prefix` search ignores   `asc_order`. The first page of results will always be   returned. - The `prefix` can also be an exact match for the   group\'s DN (for LDAP) or the auth provider\'s unique ID   for the group, if any. - For a non-`prefix` search, results are sorted by group name.  This endpoint is available only when groups are enabled in RStudio Connect and it will return an error otherwise.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
         * @summary List or search for group details
         * @param {string} [prefix] Filters groups by prefix (group name). The filter is case insensitive.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned. For a &#x60;prefix&#x60; search, the first page of results will always be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough groups to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {boolean} [ascOrder] Whether or not to return the groups in ascending order, sorted by name. For a &#x60;prefix&#x60; search, results are sorted first by exact match, then by increasing word length.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getGroups(prefix?: string, pageNumber?: number, pageSize?: number, ascOrder?: boolean, options?: any): AxiosPromise<Groups> {
            return GroupsApiFp(configuration).getGroups(prefix, pageNumber, pageSize, ascOrder, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint removes a user from a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to remove a user from a   group you do not own, but no special access is needed to   remove yourself from a group.
         * @summary Remove a group member
         * @param {string} groupGuid The group\&#39;s unique identifier
         * @param {string} userGuid The group member\&#39;s unique identifier
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeGroupMember(groupGuid: string, userGuid: string, options?: any): AxiosPromise<void> {
            return GroupsApiFp(configuration).removeGroupMember(groupGuid, userGuid, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint is used to support operations against groups not managed by Connect, such as  <a href=\"#post-/v1/groups\" onclick=\"linkClick\">creating LDAP groups</a> See <a href=\"#get-/v1/groups\" onclick=\"linkClick\">GET /v1/groups</a> for listing groups on RStudio Connect.  This endpoint searches for groups on RStudio Connect and on your LDAP system.  Results are sorted based on similarity to the `prefix`.  - This endpoint can be used only by LDAP authentication and   will return an error otherwise. - Publisher or administrator access is required to access this   endpoint.
         * @summary Search for group details from a remote provider
         * @param {string} prefix Search groups by prefix. &#x60;prefix&#x60; is case insensitive.
         * @param {number} [limit] The maximum number of groups to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchRemoteGroups(prefix: string, limit?: number, options?: any): AxiosPromise<GroupRemoteSearch> {
            return GroupsApiFp(configuration).searchRemoteGroups(prefix, limit, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint modifies the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to modify   groups.
         * @summary Modify a group name or owner (Password, PAM, OAuth2, SAML, Proxied) 
         * @param {string} guid The group\&#39;s unique identifier
         * @param {InlineObject13} group 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateGroup(guid: string, group: InlineObject13, options?: any): AxiosPromise<Group> {
            return GroupsApiFp(configuration).updateGroup(guid, group, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * GroupsApi - object-oriented interface
 * @export
 * @class GroupsApi
 * @extends {BaseAPI}
 */
export class GroupsApi extends BaseAPI {
    /**
     * This endpoint adds a user to a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to modify a group you do   not own.
     * @summary Add a group member
     * @param {string} groupGuid The group\&#39;s unique identifier
     * @param {InlineObject12} user 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public addGroupMember(groupGuid: string, user: InlineObject12, options?: any) {
        return GroupsApiFp(this.configuration).addGroupMember(groupGuid, user, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint creates the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to create   groups.
     * @summary Create a group from caller-supplied details (Password, PAM, OAuth2, SAML, Proxied) 
     * @param {InlineObject11} group 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public createGroup(group: InlineObject11, options?: any) {
        return GroupsApiFp(this.configuration).createGroup(group, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint creates the given group on the RStudio Connect server.  - This endpoint is used only for LDAP authentication. Password,   PAM, SAML, OAuth2 and Proxied authentication providers should   use the    <a href=\"#post-/v1/groups\" onclick=\"linkClick\">POST /v1/groups</a>   endpoint. - Publisher or administrator access is required to access this   endpoint. - Group members will be automatically populated from the LDAP server.  #### Group Creation Workflow on LDAP  The API lets you identify an existing group in the LDAP system and create a corresponding group on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/groups/remote\" onclick=\"linkClick\">GET /v1/groups/remote</a>   endpoint. This endpoint will return a list of potential   matching groups in LDAP. A group that does not exist in   RStudio Connect will lack a `guid`. Note the `temp_ticket`   for the desired group. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding group on RStudio Connect.  The [Create a Group from LDAP](../cookbook/groups/#create-group-ldap) recipe in the API Cookbook has sample code using this workflow.
     * @summary Create a group using details from a remote authentication provider (LDAP) 
     * @param {InlineObject10} request 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public createRemoteGroup(request: InlineObject10, options?: any) {
        return GroupsApiFp(this.configuration).createRemoteGroup(request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Delete the given group.  - This endpoint can be used only when groups are enabled in   RStudio Connnect and will return an error otherwise. - Administrator access is required to delete a group you do   not own.
     * @summary Delete a group
     * @param {string} guid The group\&#39;s unique identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public deleteGroup(guid: string, options?: any) {
        return GroupsApiFp(this.configuration).deleteGroup(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information on a specific group.  This endpoint is available only when groups are enabled in RStudio Connect.
     * @summary Get group details
     * @param {string} guid The group\&#39;s unique identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public getGroup(guid: string, options?: any) {
        return GroupsApiFp(this.configuration).getGroup(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint gets the group member details. Group member enumeration is currently not supported for LDAP.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled.
     * @summary Get group member details
     * @param {string} groupGuid The group\&#39;s unique identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public getGroupMembers(groupGuid: string, options?: any) {
        return GroupsApiFp(this.configuration).getGroupMembers(groupGuid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint lists or searches for local groups.  - For a `prefix` search, results are sorted based on   similarity to the `prefix`. A `prefix` search ignores   `asc_order`. The first page of results will always be   returned. - The `prefix` can also be an exact match for the   group\'s DN (for LDAP) or the auth provider\'s unique ID   for the group, if any. - For a non-`prefix` search, results are sorted by group name.  This endpoint is available only when groups are enabled in RStudio Connect and it will return an error otherwise.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.
     * @summary List or search for group details
     * @param {string} [prefix] Filters groups by prefix (group name). The filter is case insensitive.
     * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned. For a &#x60;prefix&#x60; search, the first page of results will always be returned.
     * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough groups to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
     * @param {boolean} [ascOrder] Whether or not to return the groups in ascending order, sorted by name. For a &#x60;prefix&#x60; search, results are sorted first by exact match, then by increasing word length.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public getGroups(prefix?: string, pageNumber?: number, pageSize?: number, ascOrder?: boolean, options?: any) {
        return GroupsApiFp(this.configuration).getGroups(prefix, pageNumber, pageSize, ascOrder, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint removes a user from a group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. If the auth provider   is configured to provide group membership information,   then it is not possible to add/remove members via this API. - Administrator access is required to remove a user from a   group you do not own, but no special access is needed to   remove yourself from a group.
     * @summary Remove a group member
     * @param {string} groupGuid The group\&#39;s unique identifier
     * @param {string} userGuid The group member\&#39;s unique identifier
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public removeGroupMember(groupGuid: string, userGuid: string, options?: any) {
        return GroupsApiFp(this.configuration).removeGroupMember(groupGuid, userGuid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint is used to support operations against groups not managed by Connect, such as  <a href=\"#post-/v1/groups\" onclick=\"linkClick\">creating LDAP groups</a> See <a href=\"#get-/v1/groups\" onclick=\"linkClick\">GET /v1/groups</a> for listing groups on RStudio Connect.  This endpoint searches for groups on RStudio Connect and on your LDAP system.  Results are sorted based on similarity to the `prefix`.  - This endpoint can be used only by LDAP authentication and   will return an error otherwise. - Publisher or administrator access is required to access this   endpoint.
     * @summary Search for group details from a remote provider
     * @param {string} prefix Search groups by prefix. &#x60;prefix&#x60; is case insensitive.
     * @param {number} [limit] The maximum number of groups to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public searchRemoteGroups(prefix: string, limit?: number, options?: any) {
        return GroupsApiFp(this.configuration).searchRemoteGroups(prefix, limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint modifies the given group.  - This endpoint is available only when groups are enabled   in RStudio Connect and only for Password, PAM, OAuth2,   SAML and Proxied authentication. - Publisher or administrator access is required to modify   groups.
     * @summary Modify a group name or owner (Password, PAM, OAuth2, SAML, Proxied) 
     * @param {string} guid The group\&#39;s unique identifier
     * @param {InlineObject13} group 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GroupsApi
     */
    public updateGroup(guid: string, group: InlineObject13, options?: any) {
        return GroupsApiFp(this.configuration).updateGroup(guid, group, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * InstrumentationApi - axios parameter creator
 * @export
 */
export const InstrumentationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This endpoint returns a portion of the visit (or \"hits\") information for all content types _other than Shiny applications_. The results returned include paging details that can be used to navigate the information this endpoint returns.  The information returned is based on data collected by RStudio Connect as users visit content.  #### Important Notes Prior to the release of this API, there was an issue with how visits were returned that caused extra entries to be stored under certain circumstances.  These will affect analyses that interpret visit counts.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering If the user calling the endpoint is a publisher, the data returned will be limited to the content owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a visit by a user to a piece of content.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
         * @summary Get Content Visits
         * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for content matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for content with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with published content can be found on the Info panel for   the content within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
         * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Content Visit Events](../admin/historical-information/#content-visit-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
         * @param {string} [from] The timestamp that starts the time window of interest.  Any visit information that happened prior to this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {string} [to] The timestamp that ends the time window of interest.  Any visit information that happened after this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough visit entries to satisfy the limit.
         * @param {string} [previous] Retrieve the previous page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {string} [next] Retrieve the next page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentVisits: async (contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/instrumentation/content/visits`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (contentGuid !== undefined) {
                localVarQueryParameter['content_guid'] = contentGuid;
            }

            if (minDataVersion !== undefined) {
                localVarQueryParameter['min_data_version'] = minDataVersion;
            }

            if (from !== undefined) {
                localVarQueryParameter['from'] = (from as any instanceof Date) ?
                    (from as any).toISOString() :
                    from;
            }

            if (to !== undefined) {
                localVarQueryParameter['to'] = (to as any instanceof Date) ?
                    (to as any).toISOString() :
                    to;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (previous !== undefined) {
                localVarQueryParameter['previous'] = previous;
            }

            if (next !== undefined) {
                localVarQueryParameter['next'] = next;
            }

            if (ascOrder !== undefined) {
                localVarQueryParameter['asc_order'] = ascOrder;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint returns a portion of the Shiny application usage information, as well as paging details that can be used to navigate that information.  The information returned is based on data collected by RStudio Connect as users visit Shiny applications.  Because of how visits are detected, end times will be slightly inflated by a reconnect timeout, generally around 15 seconds.  #### Important Notes  Prior to the release of this API, there was an issue with how visits were recorded that caused extra entries to be stored.  These will affect analyses that interpret visit counts or durations.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  - Because of how visits are detected, end times will be slightly inflated by the   currently configured client reconnect timeout, which defaults to 15 seconds.   The ending time may also be affected by connect and read timeout   settings.    The [Shiny Application   Events](../admin/historical-information/#shiny-application-events)   section of the RStudio Connect Admin Guide has more details about   how these events are collected. - This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering  If the user calling the endpoint is a publisher, the data returned will be limited to those applications owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a session by a user of a Shiny application.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
         * @summary Get Shiny App Usage
         * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for the Shiny application(s) matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for the Shiny Applications with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with a published Shiny application can be found on the   Info panel for the application within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
         * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Shiny Application Events](../admin/historical-information/#shiny-application-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
         * @param {string} [from] The timestamp that starts the time window of interest.  Any usage information that _ends_ prior to this timestamp will not be returned.  Individual records may contain a starting time that is before this if they end after it or have not finished.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {string} [to] The timestamp that ends the time window of interest.  Any usage information that _starts_ after this timestamp will not be returned.  Individual records may contain an ending time that is after this (or no ending time) if they start before it.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough usage entries to satisfy the limit.
         * @param {string} [previous] Retrieve the previous page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {string} [next] Retrieve the next page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getShinyAppUsage: async (contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/instrumentation/shiny/usage`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (contentGuid !== undefined) {
                localVarQueryParameter['content_guid'] = contentGuid;
            }

            if (minDataVersion !== undefined) {
                localVarQueryParameter['min_data_version'] = minDataVersion;
            }

            if (from !== undefined) {
                localVarQueryParameter['from'] = (from as any instanceof Date) ?
                    (from as any).toISOString() :
                    from;
            }

            if (to !== undefined) {
                localVarQueryParameter['to'] = (to as any instanceof Date) ?
                    (to as any).toISOString() :
                    to;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            if (previous !== undefined) {
                localVarQueryParameter['previous'] = previous;
            }

            if (next !== undefined) {
                localVarQueryParameter['next'] = next;
            }

            if (ascOrder !== undefined) {
                localVarQueryParameter['asc_order'] = ascOrder;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * InstrumentationApi - functional programming interface
 * @export
 */
export const InstrumentationApiFp = function(configuration?: Configuration) {
    return {
        /**
         * This endpoint returns a portion of the visit (or \"hits\") information for all content types _other than Shiny applications_. The results returned include paging details that can be used to navigate the information this endpoint returns.  The information returned is based on data collected by RStudio Connect as users visit content.  #### Important Notes Prior to the release of this API, there was an issue with how visits were returned that caused extra entries to be stored under certain circumstances.  These will affect analyses that interpret visit counts.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering If the user calling the endpoint is a publisher, the data returned will be limited to the content owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a visit by a user to a piece of content.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
         * @summary Get Content Visits
         * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for content matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for content with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with published content can be found on the Info panel for   the content within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
         * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Content Visit Events](../admin/historical-information/#content-visit-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
         * @param {string} [from] The timestamp that starts the time window of interest.  Any visit information that happened prior to this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {string} [to] The timestamp that ends the time window of interest.  Any visit information that happened after this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough visit entries to satisfy the limit.
         * @param {string} [previous] Retrieve the previous page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {string} [next] Retrieve the next page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getContentVisits(contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ContentVisitLogs>> {
            const localVarAxiosArgs = await InstrumentationApiAxiosParamCreator(configuration).getContentVisits(contentGuid, minDataVersion, from, to, limit, previous, next, ascOrder, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint returns a portion of the Shiny application usage information, as well as paging details that can be used to navigate that information.  The information returned is based on data collected by RStudio Connect as users visit Shiny applications.  Because of how visits are detected, end times will be slightly inflated by a reconnect timeout, generally around 15 seconds.  #### Important Notes  Prior to the release of this API, there was an issue with how visits were recorded that caused extra entries to be stored.  These will affect analyses that interpret visit counts or durations.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  - Because of how visits are detected, end times will be slightly inflated by the   currently configured client reconnect timeout, which defaults to 15 seconds.   The ending time may also be affected by connect and read timeout   settings.    The [Shiny Application   Events](../admin/historical-information/#shiny-application-events)   section of the RStudio Connect Admin Guide has more details about   how these events are collected. - This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering  If the user calling the endpoint is a publisher, the data returned will be limited to those applications owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a session by a user of a Shiny application.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
         * @summary Get Shiny App Usage
         * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for the Shiny application(s) matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for the Shiny Applications with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with a published Shiny application can be found on the   Info panel for the application within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
         * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Shiny Application Events](../admin/historical-information/#shiny-application-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
         * @param {string} [from] The timestamp that starts the time window of interest.  Any usage information that _ends_ prior to this timestamp will not be returned.  Individual records may contain a starting time that is before this if they end after it or have not finished.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {string} [to] The timestamp that ends the time window of interest.  Any usage information that _starts_ after this timestamp will not be returned.  Individual records may contain an ending time that is after this (or no ending time) if they start before it.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough usage entries to satisfy the limit.
         * @param {string} [previous] Retrieve the previous page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {string} [next] Retrieve the next page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getShinyAppUsage(contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ShinyAppUsageLogs>> {
            const localVarAxiosArgs = await InstrumentationApiAxiosParamCreator(configuration).getShinyAppUsage(contentGuid, minDataVersion, from, to, limit, previous, next, ascOrder, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * InstrumentationApi - factory interface
 * @export
 */
export const InstrumentationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * This endpoint returns a portion of the visit (or \"hits\") information for all content types _other than Shiny applications_. The results returned include paging details that can be used to navigate the information this endpoint returns.  The information returned is based on data collected by RStudio Connect as users visit content.  #### Important Notes Prior to the release of this API, there was an issue with how visits were returned that caused extra entries to be stored under certain circumstances.  These will affect analyses that interpret visit counts.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering If the user calling the endpoint is a publisher, the data returned will be limited to the content owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a visit by a user to a piece of content.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
         * @summary Get Content Visits
         * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for content matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for content with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with published content can be found on the Info panel for   the content within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
         * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Content Visit Events](../admin/historical-information/#content-visit-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
         * @param {string} [from] The timestamp that starts the time window of interest.  Any visit information that happened prior to this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {string} [to] The timestamp that ends the time window of interest.  Any visit information that happened after this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough visit entries to satisfy the limit.
         * @param {string} [previous] Retrieve the previous page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {string} [next] Retrieve the next page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getContentVisits(contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any): AxiosPromise<ContentVisitLogs> {
            return InstrumentationApiFp(configuration).getContentVisits(contentGuid, minDataVersion, from, to, limit, previous, next, ascOrder, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint returns a portion of the Shiny application usage information, as well as paging details that can be used to navigate that information.  The information returned is based on data collected by RStudio Connect as users visit Shiny applications.  Because of how visits are detected, end times will be slightly inflated by a reconnect timeout, generally around 15 seconds.  #### Important Notes  Prior to the release of this API, there was an issue with how visits were recorded that caused extra entries to be stored.  These will affect analyses that interpret visit counts or durations.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  - Because of how visits are detected, end times will be slightly inflated by the   currently configured client reconnect timeout, which defaults to 15 seconds.   The ending time may also be affected by connect and read timeout   settings.    The [Shiny Application   Events](../admin/historical-information/#shiny-application-events)   section of the RStudio Connect Admin Guide has more details about   how these events are collected. - This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering  If the user calling the endpoint is a publisher, the data returned will be limited to those applications owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a session by a user of a Shiny application.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
         * @summary Get Shiny App Usage
         * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for the Shiny application(s) matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for the Shiny Applications with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with a published Shiny application can be found on the   Info panel for the application within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
         * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Shiny Application Events](../admin/historical-information/#shiny-application-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
         * @param {string} [from] The timestamp that starts the time window of interest.  Any usage information that _ends_ prior to this timestamp will not be returned.  Individual records may contain a starting time that is before this if they end after it or have not finished.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {string} [to] The timestamp that ends the time window of interest.  Any usage information that _starts_ after this timestamp will not be returned.  Individual records may contain an ending time that is after this (or no ending time) if they start before it.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
         * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough usage entries to satisfy the limit.
         * @param {string} [previous] Retrieve the previous page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {string} [next] Retrieve the next page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
         * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getShinyAppUsage(contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any): AxiosPromise<ShinyAppUsageLogs> {
            return InstrumentationApiFp(configuration).getShinyAppUsage(contentGuid, minDataVersion, from, to, limit, previous, next, ascOrder, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * InstrumentationApi - object-oriented interface
 * @export
 * @class InstrumentationApi
 * @extends {BaseAPI}
 */
export class InstrumentationApi extends BaseAPI {
    /**
     * This endpoint returns a portion of the visit (or \"hits\") information for all content types _other than Shiny applications_. The results returned include paging details that can be used to navigate the information this endpoint returns.  The information returned is based on data collected by RStudio Connect as users visit content.  #### Important Notes Prior to the release of this API, there was an issue with how visits were returned that caused extra entries to be stored under certain circumstances.  These will affect analyses that interpret visit counts.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering If the user calling the endpoint is a publisher, the data returned will be limited to the content owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a visit by a user to a piece of content.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
     * @summary Get Content Visits
     * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for content matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for content with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with published content can be found on the Info panel for   the content within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
     * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Content Visit Events](../admin/historical-information/#content-visit-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
     * @param {string} [from] The timestamp that starts the time window of interest.  Any visit information that happened prior to this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
     * @param {string} [to] The timestamp that ends the time window of interest.  Any visit information that happened after this timestamp will not be returned.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
     * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough visit entries to satisfy the limit.
     * @param {string} [previous] Retrieve the previous page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
     * @param {string} [next] Retrieve the next page of content visit logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
     * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InstrumentationApi
     */
    public getContentVisits(contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any) {
        return InstrumentationApiFp(this.configuration).getContentVisits(contentGuid, minDataVersion, from, to, limit, previous, next, ascOrder, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint returns a portion of the Shiny application usage information, as well as paging details that can be used to navigate that information.  The information returned is based on data collected by RStudio Connect as users visit Shiny applications.  Because of how visits are detected, end times will be slightly inflated by a reconnect timeout, generally around 15 seconds.  #### Important Notes  Prior to the release of this API, there was an issue with how visits were recorded that caused extra entries to be stored.  These will affect analyses that interpret visit counts or durations.  Entries that were recorded before the issue was addressed are not returned by default.  If you desire these records, specify the `min_data_version` filter with a value of 0.  - Because of how visits are detected, end times will be slightly inflated by the   currently configured client reconnect timeout, which defaults to 15 seconds.   The ending time may also be affected by connect and read timeout   settings.    The [Shiny Application   Events](../admin/historical-information/#shiny-application-events)   section of the RStudio Connect Admin Guide has more details about   how these events are collected. - This endpoint requires administrator or publisher access.  #### Filtering of results:  There are several ways the result set can be filtered by the server before being sent back within the API response. If multiple filters are in effect, they will be logically ANDed together.  ##### Implicit Filtering  If the user calling the endpoint is a publisher, the data returned will be limited to those applications owned by the user.  ##### Time Windows  This API accepts optional `from` and `to` timestamps to define a window of interest.  If `from` is not specified, it is assumed to be before the earliest recorded information.  If `to` is not specified, it is assumed to be \"now\".  Any visit to content that falls inclusively within the time window will be part of the result set.  #### Responses  The response of a call will contain zero or more data records representing a session by a user of a Shiny application.  No more than `limit` records will be returned. Multiple requests of this endpoint are typically required to retrieve the complete result set from the server.  To facilitate this, each response includes a paging object containing full URL links which can be requested to iteratively move forward or backward through multiple response pages.
     * @summary Get Shiny App Usage
     * @param {string} [contentGuid] Filter results by content GUID.  This parameter will limit the results to include only the access records for the Shiny application(s) matching the content GUID filter value.  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.  Multiple content GUIDs may be specified using the bar character &#x60;|&#x60; which represents a logical OR across the surounding GUIDs.  For example, &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3|e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60; will filter the result set to only the access records for the Shiny Applications with a GUID of &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; or a GUID of &#x60;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;.  - The GUID associated with a published Shiny application can be found on the   Info panel for the application within the RStudio Connect Dashboard window. - Note that if you specify the &#x60;content_guid&#x60; more than once like this,   &#x60;content_guid&#x3D;6f300623-1e0c-48e6-a473-ddf630c0c0c3&amp;content_guid&#x3D;&amp;e08a86af-a262-4152-8366-f2d8ec3c54f9&#x60;   you will receive results for the first GUID only; the 2nd and subsequent &#x60;content_guid&#x60;   fields are ignored. - Note that there is a practical limit of around 40 to the number of GUIDs that   may be specified due to the length of a html query string.
     * @param {number} [minDataVersion] Filter by data version.  Records with a data version lower than the given value will be excluded from the set of results.  The [Shiny Application Events](../admin/historical-information/#shiny-application-events) section of the RStudio Connect Admin Guide explains how to interpret &#x60;data_version&#x60; values.
     * @param {string} [from] The timestamp that starts the time window of interest.  Any usage information that _ends_ prior to this timestamp will not be returned.  Individual records may contain a starting time that is before this if they end after it or have not finished.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
     * @param {string} [to] The timestamp that ends the time window of interest.  Any usage information that _starts_ after this timestamp will not be returned.  Individual records may contain an ending time that is after this (or no ending time) if they start before it.  Example value &#x3D; &#x60;2018-09-15T18:00:00Z&#x60; using [RFC3339](https://tools.ietf.org/html/rfc3339) format of (&#x60;yyyy-mm-ddThh:mm:ss&#x60; followed by either &#x60;-##:##&#x60;, &#x60;.##Z&#x60; or &#x60;Z&#x60;)
     * @param {number} [limit] The number of records to return.  The minimum supported value is 1 and maximum supported value is 500.  Note that &#x60;limit&#x60; is a \&quot;best effort\&quot; request since there may not be enough usage entries to satisfy the limit.
     * @param {string} [previous] Retrieve the previous page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
     * @param {string} [next] Retrieve the next page of Shiny application usage logs relative to the provided value.  This value corresponds to an internal reference within the server and should be sourced from the appropriate attribute within the paging object of a previous response.
     * @param {boolean} [ascOrder] Determines if the response records should be listed in ascending or descending order within the response.  Ordering is by the &#x60;started&#x60; timestamp field.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof InstrumentationApi
     */
    public getShinyAppUsage(contentGuid?: string, minDataVersion?: number, from?: string, to?: string, limit?: number, previous?: string, next?: string, ascOrder?: boolean, options?: any) {
        return InstrumentationApiFp(this.configuration).getShinyAppUsage(contentGuid, minDataVersion, from, to, limit, previous, next, ascOrder, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * RInformationApi - axios parameter creator
 * @export
 */
export const RInformationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This endpoint returns a list of metadata objects for each installed version of R that RStudio Connect can run.  This endpoint requires authentication and is only available to `publisher` and `administrator` roles.  The [R Versions Available](../cookbook/system-information/#available-r-versions) recipe in the RStudio Connect API Cookbook contains a recipe with sample code.
         * @summary Get R Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRInformation: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/server_settings/r`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * RInformationApi - functional programming interface
 * @export
 */
export const RInformationApiFp = function(configuration?: Configuration) {
    return {
        /**
         * This endpoint returns a list of metadata objects for each installed version of R that RStudio Connect can run.  This endpoint requires authentication and is only available to `publisher` and `administrator` roles.  The [R Versions Available](../cookbook/system-information/#available-r-versions) recipe in the RStudio Connect API Cookbook contains a recipe with sample code.
         * @summary Get R Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getRInformation(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RInstallations>> {
            const localVarAxiosArgs = await RInformationApiAxiosParamCreator(configuration).getRInformation(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * RInformationApi - factory interface
 * @export
 */
export const RInformationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * This endpoint returns a list of metadata objects for each installed version of R that RStudio Connect can run.  This endpoint requires authentication and is only available to `publisher` and `administrator` roles.  The [R Versions Available](../cookbook/system-information/#available-r-versions) recipe in the RStudio Connect API Cookbook contains a recipe with sample code.
         * @summary Get R Information
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getRInformation(options?: any): AxiosPromise<RInstallations> {
            return RInformationApiFp(configuration).getRInformation(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * RInformationApi - object-oriented interface
 * @export
 * @class RInformationApi
 * @extends {BaseAPI}
 */
export class RInformationApi extends BaseAPI {
    /**
     * This endpoint returns a list of metadata objects for each installed version of R that RStudio Connect can run.  This endpoint requires authentication and is only available to `publisher` and `administrator` roles.  The [R Versions Available](../cookbook/system-information/#available-r-versions) recipe in the RStudio Connect API Cookbook contains a recipe with sample code.
     * @summary Get R Information
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof RInformationApi
     */
    public getRInformation(options?: any) {
        return RInformationApiFp(this.configuration).getRInformation(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * TagsApi - axios parameter creator
 * @export
 */
export const TagsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Add the specified tag to an individual content item. When adding a tag, all tags above the specified tag in the tag tree are also added to the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
         * @summary Add tag to content
         * @param {string} guid The unique identifier of the content item.
         * @param {InlineObject5} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTag: async (guid: string, tag: InlineObject5, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling addTag.');
            }
            // verify required parameter 'tag' is not null or undefined
            if (tag === null || tag === undefined) {
                throw new RequiredError('tag','Required parameter tag was null or undefined when calling addTag.');
            }
            const localVarPath = `/v1/content/{guid}/tags`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof tag !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(tag !== undefined ? tag : {})
                : (tag || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Create a new tag. Tags without a parent are considered tag \"categories\" and are used to organize other tags. Note that tag categories cannot be added to content items.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Create tag
         * @param {InlineObject14} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTag: async (tag: InlineObject14, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'tag' is not null or undefined
            if (tag === null || tag === undefined) {
                throw new RequiredError('tag','Required parameter tag was null or undefined when calling createTag.');
            }
            const localVarPath = `/v1/tags`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof tag !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(tag !== undefined ? tag : {})
                : (tag || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Deletes a tag, including all descendants in its own tag hierarchy.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Delete tag
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTag: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteTag.');
            }
            const localVarPath = `/v1/tags/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get an individual tag  Authenticated access from a user is required.
         * @summary Get tag
         * @param {string} id The unique identifier of the tag
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTag: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getTag.');
            }
            const localVarPath = `/v1/tags/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get an individual tag by a comma-delimited \"path\" to the tag. The path to the tag is the series of tag names to traverse the tag hierarchy, starting with a tag category.  Authenticated access from a user is required.
         * @summary Get tag by path
         * @param {string} path The path to the tag, as comma-delimited names
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTagByPath: async (path: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'path' is not null or undefined
            if (path === null || path === undefined) {
                throw new RequiredError('path','Required parameter path was null or undefined when calling getTagByPath.');
            }
            const localVarPath = `/v1/tags/{path}`
                .replace(`{${"path"}}`, encodeURIComponent(String(path)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List of all tags for the specified content item  Authenticated access required from an admin or from a user with at least viewer permissions on the content item.
         * @summary List tags for content
         * @param {string} guid The unique identifier of the content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listContentTags: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling listContentTags.');
            }
            const localVarPath = `/v1/content/{guid}/tags`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List all of the content for the specified tag.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary List content for tags
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTagContent: async (id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling listTagContent.');
            }
            const localVarPath = `/v1/tags/{id}/content`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List of all tags.  Authenticated access from a user is required.
         * @summary List tags
         * @param {string} [parentId] The unique identifier of the parent tag
         * @param {string} [name] The tag name  Note: tag names are only unique within the scope of a parent, which means that it is possible to have multiple results when querying by name; however, querying by both &#x60;name&#x60; and &#x60;parent_id&#x60; ensures a single result.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTags: async (parentId?: string, name?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/tags`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (parentId !== undefined) {
                localVarQueryParameter['parent_id'] = parentId;
            }

            if (name !== undefined) {
                localVarQueryParameter['name'] = name;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Remove the specified tag from an individual content item. When removing a tag, all children and descendant tags are also removed from the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
         * @summary Remove tag from content
         * @param {string} guid The unique identifier of the content item.
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeTag: async (guid: string, id: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling removeTag.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling removeTag.');
            }
            const localVarPath = `/v1/content/{guid}/tags/{id}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)))
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Update an existing tag.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Update tag
         * @param {string} id The unique identifier of the tag.
         * @param {InlineObject15} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTag: async (id: string, tag: InlineObject15, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling updateTag.');
            }
            // verify required parameter 'tag' is not null or undefined
            if (tag === null || tag === undefined) {
                throw new RequiredError('tag','Required parameter tag was null or undefined when calling updateTag.');
            }
            const localVarPath = `/v1/tags/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof tag !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(tag !== undefined ? tag : {})
                : (tag || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TagsApi - functional programming interface
 * @export
 */
export const TagsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Add the specified tag to an individual content item. When adding a tag, all tags above the specified tag in the tag tree are also added to the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
         * @summary Add tag to content
         * @param {string} guid The unique identifier of the content item.
         * @param {InlineObject5} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async addTag(guid: string, tag: InlineObject5, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Tag>>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).addTag(guid, tag, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Create a new tag. Tags without a parent are considered tag \"categories\" and are used to organize other tags. Note that tag categories cannot be added to content items.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Create tag
         * @param {InlineObject14} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createTag(tag: InlineObject14, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tag>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).createTag(tag, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Deletes a tag, including all descendants in its own tag hierarchy.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Delete tag
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteTag(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).deleteTag(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get an individual tag  Authenticated access from a user is required.
         * @summary Get tag
         * @param {string} id The unique identifier of the tag
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTag(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tag>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).getTag(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get an individual tag by a comma-delimited \"path\" to the tag. The path to the tag is the series of tag names to traverse the tag hierarchy, starting with a tag category.  Authenticated access from a user is required.
         * @summary Get tag by path
         * @param {string} path The path to the tag, as comma-delimited names
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTagByPath(path: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tag>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).getTagByPath(path, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List of all tags for the specified content item  Authenticated access required from an admin or from a user with at least viewer permissions on the content item.
         * @summary List tags for content
         * @param {string} guid The unique identifier of the content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listContentTags(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Tag>>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).listContentTags(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all of the content for the specified tag.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary List content for tags
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTagContent(id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Content>>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).listTagContent(id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List of all tags.  Authenticated access from a user is required.
         * @summary List tags
         * @param {string} [parentId] The unique identifier of the parent tag
         * @param {string} [name] The tag name  Note: tag names are only unique within the scope of a parent, which means that it is possible to have multiple results when querying by name; however, querying by both &#x60;name&#x60; and &#x60;parent_id&#x60; ensures a single result.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTags(parentId?: string, name?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Tag>>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).listTags(parentId, name, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Remove the specified tag from an individual content item. When removing a tag, all children and descendant tags are also removed from the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
         * @summary Remove tag from content
         * @param {string} guid The unique identifier of the content item.
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async removeTag(guid: string, id: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<Tag>>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).removeTag(guid, id, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Update an existing tag.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Update tag
         * @param {string} id The unique identifier of the tag.
         * @param {InlineObject15} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateTag(id: string, tag: InlineObject15, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tag>> {
            const localVarAxiosArgs = await TagsApiAxiosParamCreator(configuration).updateTag(id, tag, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TagsApi - factory interface
 * @export
 */
export const TagsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Add the specified tag to an individual content item. When adding a tag, all tags above the specified tag in the tag tree are also added to the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
         * @summary Add tag to content
         * @param {string} guid The unique identifier of the content item.
         * @param {InlineObject5} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        addTag(guid: string, tag: InlineObject5, options?: any): AxiosPromise<Array<Tag>> {
            return TagsApiFp(configuration).addTag(guid, tag, options).then((request) => request(axios, basePath));
        },
        /**
         * Create a new tag. Tags without a parent are considered tag \"categories\" and are used to organize other tags. Note that tag categories cannot be added to content items.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Create tag
         * @param {InlineObject14} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createTag(tag: InlineObject14, options?: any): AxiosPromise<Tag> {
            return TagsApiFp(configuration).createTag(tag, options).then((request) => request(axios, basePath));
        },
        /**
         * Deletes a tag, including all descendants in its own tag hierarchy.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Delete tag
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteTag(id: string, options?: any): AxiosPromise<void> {
            return TagsApiFp(configuration).deleteTag(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get an individual tag  Authenticated access from a user is required.
         * @summary Get tag
         * @param {string} id The unique identifier of the tag
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTag(id: string, options?: any): AxiosPromise<Tag> {
            return TagsApiFp(configuration).getTag(id, options).then((request) => request(axios, basePath));
        },
        /**
         * Get an individual tag by a comma-delimited \"path\" to the tag. The path to the tag is the series of tag names to traverse the tag hierarchy, starting with a tag category.  Authenticated access from a user is required.
         * @summary Get tag by path
         * @param {string} path The path to the tag, as comma-delimited names
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTagByPath(path: string, options?: any): AxiosPromise<Tag> {
            return TagsApiFp(configuration).getTagByPath(path, options).then((request) => request(axios, basePath));
        },
        /**
         * List of all tags for the specified content item  Authenticated access required from an admin or from a user with at least viewer permissions on the content item.
         * @summary List tags for content
         * @param {string} guid The unique identifier of the content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listContentTags(guid: string, options?: any): AxiosPromise<Array<Tag>> {
            return TagsApiFp(configuration).listContentTags(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * List all of the content for the specified tag.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
         * @summary List content for tags
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTagContent(id: string, options?: any): AxiosPromise<Array<Content>> {
            return TagsApiFp(configuration).listTagContent(id, options).then((request) => request(axios, basePath));
        },
        /**
         * List of all tags.  Authenticated access from a user is required.
         * @summary List tags
         * @param {string} [parentId] The unique identifier of the parent tag
         * @param {string} [name] The tag name  Note: tag names are only unique within the scope of a parent, which means that it is possible to have multiple results when querying by name; however, querying by both &#x60;name&#x60; and &#x60;parent_id&#x60; ensures a single result.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTags(parentId?: string, name?: string, options?: any): AxiosPromise<Array<Tag>> {
            return TagsApiFp(configuration).listTags(parentId, name, options).then((request) => request(axios, basePath));
        },
        /**
         * Remove the specified tag from an individual content item. When removing a tag, all children and descendant tags are also removed from the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
         * @summary Remove tag from content
         * @param {string} guid The unique identifier of the content item.
         * @param {string} id The unique identifier of the tag.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        removeTag(guid: string, id: string, options?: any): AxiosPromise<Array<Tag>> {
            return TagsApiFp(configuration).removeTag(guid, id, options).then((request) => request(axios, basePath));
        },
        /**
         * Update an existing tag.  Authenticated access from a user having an \"administrator\" role is required.
         * @summary Update tag
         * @param {string} id The unique identifier of the tag.
         * @param {InlineObject15} tag 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateTag(id: string, tag: InlineObject15, options?: any): AxiosPromise<Tag> {
            return TagsApiFp(configuration).updateTag(id, tag, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TagsApi - object-oriented interface
 * @export
 * @class TagsApi
 * @extends {BaseAPI}
 */
export class TagsApi extends BaseAPI {
    /**
     * Add the specified tag to an individual content item. When adding a tag, all tags above the specified tag in the tag tree are also added to the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
     * @summary Add tag to content
     * @param {string} guid The unique identifier of the content item.
     * @param {InlineObject5} tag 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public addTag(guid: string, tag: InlineObject5, options?: any) {
        return TagsApiFp(this.configuration).addTag(guid, tag, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Create a new tag. Tags without a parent are considered tag \"categories\" and are used to organize other tags. Note that tag categories cannot be added to content items.  Authenticated access from a user having an \"administrator\" role is required.
     * @summary Create tag
     * @param {InlineObject14} tag 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public createTag(tag: InlineObject14, options?: any) {
        return TagsApiFp(this.configuration).createTag(tag, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Deletes a tag, including all descendants in its own tag hierarchy.  Authenticated access from a user having an \"administrator\" role is required.
     * @summary Delete tag
     * @param {string} id The unique identifier of the tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public deleteTag(id: string, options?: any) {
        return TagsApiFp(this.configuration).deleteTag(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get an individual tag  Authenticated access from a user is required.
     * @summary Get tag
     * @param {string} id The unique identifier of the tag
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public getTag(id: string, options?: any) {
        return TagsApiFp(this.configuration).getTag(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get an individual tag by a comma-delimited \"path\" to the tag. The path to the tag is the series of tag names to traverse the tag hierarchy, starting with a tag category.  Authenticated access from a user is required.
     * @summary Get tag by path
     * @param {string} path The path to the tag, as comma-delimited names
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public getTagByPath(path: string, options?: any) {
        return TagsApiFp(this.configuration).getTagByPath(path, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List of all tags for the specified content item  Authenticated access required from an admin or from a user with at least viewer permissions on the content item.
     * @summary List tags for content
     * @param {string} guid The unique identifier of the content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public listContentTags(guid: string, options?: any) {
        return TagsApiFp(this.configuration).listContentTags(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all of the content for the specified tag.  Authenticated access from a user is required. If an \"administrator\" role is used, then all content items will be returned regardless of the visibility to the requesting user.  Note that R or Python version information is only provided to clients that authenticate as admin or publisher users; it is suppressed for viewers.
     * @summary List content for tags
     * @param {string} id The unique identifier of the tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public listTagContent(id: string, options?: any) {
        return TagsApiFp(this.configuration).listTagContent(id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List of all tags.  Authenticated access from a user is required.
     * @summary List tags
     * @param {string} [parentId] The unique identifier of the parent tag
     * @param {string} [name] The tag name  Note: tag names are only unique within the scope of a parent, which means that it is possible to have multiple results when querying by name; however, querying by both &#x60;name&#x60; and &#x60;parent_id&#x60; ensures a single result.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public listTags(parentId?: string, name?: string, options?: any) {
        return TagsApiFp(this.configuration).listTags(parentId, name, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Remove the specified tag from an individual content item. When removing a tag, all children and descendant tags are also removed from the content item.  Authenticated access required from an admin or from a user with collaborator/editor permissions on the content item.
     * @summary Remove tag from content
     * @param {string} guid The unique identifier of the content item.
     * @param {string} id The unique identifier of the tag.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public removeTag(guid: string, id: string, options?: any) {
        return TagsApiFp(this.configuration).removeTag(guid, id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Update an existing tag.  Authenticated access from a user having an \"administrator\" role is required.
     * @summary Update tag
     * @param {string} id The unique identifier of the tag.
     * @param {InlineObject15} tag 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TagsApi
     */
    public updateTag(id: string, tag: InlineObject15, options?: any) {
        return TagsApiFp(this.configuration).updateTag(id, tag, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * TasksApi - axios parameter creator
 * @export
 */
export const TasksApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the `finished` field in the JSON response is `true`.  **Note:** In high-availability clustered deployments of Connect, the task request must be serviced by the node that is executing the task. This is done by ensuring that the cookies returned from the deployment operation are included in subsequent requests, so that the load balancer can appropriately direct the request. In a single-node configuration, the cookie can be omitted.
         * @summary Get task details
         * @param {string} id The identifier of the desired task.
         * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
         * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTask: async (id: string, first?: number, wait?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getTask.');
            }
            const localVarPath = `/v1/tasks/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (first !== undefined) {
                localVarQueryParameter['first'] = first;
            }

            if (wait !== undefined) {
                localVarQueryParameter['wait'] = wait;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TasksApi - functional programming interface
 * @export
 */
export const TasksApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the `finished` field in the JSON response is `true`.  **Note:** In high-availability clustered deployments of Connect, the task request must be serviced by the node that is executing the task. This is done by ensuring that the cookies returned from the deployment operation are included in subsequent requests, so that the load balancer can appropriately direct the request. In a single-node configuration, the cookie can be omitted.
         * @summary Get task details
         * @param {string} id The identifier of the desired task.
         * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
         * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTask(id: string, first?: number, wait?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2005>> {
            const localVarAxiosArgs = await TasksApiAxiosParamCreator(configuration).getTask(id, first, wait, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TasksApi - factory interface
 * @export
 */
export const TasksApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the `finished` field in the JSON response is `true`.  **Note:** In high-availability clustered deployments of Connect, the task request must be serviced by the node that is executing the task. This is done by ensuring that the cookies returned from the deployment operation are included in subsequent requests, so that the load balancer can appropriately direct the request. In a single-node configuration, the cookie can be omitted.
         * @summary Get task details
         * @param {string} id The identifier of the desired task.
         * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
         * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTask(id: string, first?: number, wait?: number, options?: any): AxiosPromise<InlineResponse2005> {
            return TasksApiFp(configuration).getTask(id, first, wait, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TasksApi - object-oriented interface
 * @export
 * @class TasksApi
 * @extends {BaseAPI}
 */
export class TasksApi extends BaseAPI {
    /**
     * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the `finished` field in the JSON response is `true`.  **Note:** In high-availability clustered deployments of Connect, the task request must be serviced by the node that is executing the task. This is done by ensuring that the cookies returned from the deployment operation are included in subsequent requests, so that the load balancer can appropriately direct the request. In a single-node configuration, the cookie can be omitted.
     * @summary Get task details
     * @param {string} id The identifier of the desired task.
     * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
     * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TasksApi
     */
    public getTask(id: string, first?: number, wait?: number, options?: any) {
        return TasksApiFp(this.configuration).getTask(id, first, wait, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * TasksV1ExperimentalApi - axios parameter creator
 * @export
 */
export const TasksV1ExperimentalApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the JSON response indicates that the task has finished.
         * @summary Get task details
         * @param {string} id The identifier of the desired task.
         * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
         * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTask: async (id: string, first?: number, wait?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getTask.');
            }
            const localVarPath = `/v1/experimental/tasks/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (first !== undefined) {
                localVarQueryParameter['first'] = first;
            }

            if (wait !== undefined) {
                localVarQueryParameter['wait'] = wait;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TasksV1ExperimentalApi - functional programming interface
 * @export
 */
export const TasksV1ExperimentalApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the JSON response indicates that the task has finished.
         * @summary Get task details
         * @param {string} id The identifier of the desired task.
         * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
         * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getTask(id: string, first?: number, wait?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2004>> {
            const localVarAxiosArgs = await TasksV1ExperimentalApiAxiosParamCreator(configuration).getTask(id, first, wait, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TasksV1ExperimentalApi - factory interface
 * @export
 */
export const TasksV1ExperimentalApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the JSON response indicates that the task has finished.
         * @summary Get task details
         * @param {string} id The identifier of the desired task.
         * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
         * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getTask(id: string, first?: number, wait?: number, options?: any): AxiosPromise<InlineResponse2004> {
            return TasksV1ExperimentalApiFp(configuration).getTask(id, first, wait, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TasksV1ExperimentalApi - object-oriented interface
 * @export
 * @class TasksV1ExperimentalApi
 * @extends {BaseAPI}
 */
export class TasksV1ExperimentalApi extends BaseAPI {
    /**
     * Returns the current state of a task and any output lines past the requested initial position (`first`).  When `wait` is non-zero, will wait up to that number of seconds for the task to complete before responding. The current state of the task is returned once the task completes or `wait` seconds elapse.  Incrementally receive task output by using the `last` response field value as the `first` value in a subsequent query.  Use `wait` and `first` together to incrementally fetch generated output.  Here is a URL that allows up to 5 seconds before returning all available output:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=0 ```  Let\'s assume that request has a JSON response with the `last` field having a value of `23`. Here is a URL that requests output past that point, again allowing up to 5 seconds:  ``` /v1/experimental/tasks/CmsfmnfDDyRUrsAc?wait=5&first=23 ```  Continue with this pattern until the JSON response indicates that the task has finished.
     * @summary Get task details
     * @param {string} id The identifier of the desired task.
     * @param {number} [first] The first line of output to include in the response. The value &#x60;0&#x60; indicates that all lines should be returned.  Values less than &#x60;0&#x60; are not permitted. Values greater than the total number of lines produced by the task are not permitted.
     * @param {number} [wait] The number of seconds to wait for task completion before responding. The current state of the task is returned once the task completes or this time elapses.  Values less than &#x60;0&#x60; or greater than &#x60;20&#x60; are not permitted.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TasksV1ExperimentalApi
     */
    public getTask(id: string, first?: number, wait?: number, options?: any) {
        return TasksV1ExperimentalApiFp(this.configuration).getTask(id, first, wait, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UsersApi - axios parameter creator
 * @export
 */
export const UsersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * This endpoint creates the given user on the RStudio Connect server.  - This endpoint is used only for LDAP and OAuth2 with Google   authentication. All other authentication providers should   use the    <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint. - Unlike the   <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint, publisher or administrator access is required to access this   endpoint.  #### User Creation Workflow on LDAP and OAuth2 with Google  This endpoint requires authentication, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect? The first user can be created by simply logging into RStudio Connect. The RStudio Connect Server API cannot be used to create the first user. Once logged in, you can create an API Key.  For LDAP and OAuth2 with Google, the API lets you identify an existing user in the LDAP or OAuth2 with Google system and create a corresponding account on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/users/remote\" onclick=\"linkClick\">GET /v1/users/remote</a>   endpoint. This   endpoint will return a list of potential matching accounts   in LDAP or OAuth2 with Google. A user with no account on RStudio Connect will   lack a `guid`. Note the `temp_ticket` for the desired user   account. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding account on RStudio Connect.  The [Create a User from LDAP/OAuth](../cookbook/users/#create-user-ldap-oauth2) recipe in the API Cookbook has sample code using this workflow.  #### LDAP and OAuth2 with Google Authentication  - The created user role will default to the role specified by   the config setting `Authorization.DefaultUserRole`.
         * @summary Create a user using details from a remote authentication provider (LDAP, OAuth2 with Google) 
         * @param {InlineObject16} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPullUser: async (request: InlineObject16, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling createPullUser.');
            }
            const localVarPath = `/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof request !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(request !== undefined ? request : {})
                : (request || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint creates the given user.  - This endpoint is used only for SAML, OAuth2 (non-Google), password, PAM, and proxied   authentication. All other authentication providers should   use the    <a href=\"#put-/v1/users\" onclick=\"linkClick\">PUT /v1/users</a>   endpoint. - Administrator access is required to create *other* users.  #### Initial User Creation Workflow  This endpoint requires authentication to create *other* users, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect?  - For password authentication, you can use this endpoint   without an API Key to create the first user. The first user   will be an administrator. - For SAML, OAuth2 (non-Google), PAM or proxied authentication, the first user can be   created by logging into RStudio Connect. The API cannot be used.  Once the first user is created, an API Key can be used to access this endpoint and create subsequent users. The [API Keys](../user/api-keys/) chapter of the RStudio Connect User Guide explains how to create an API Key.  #### All Authentication Providers  - When `user_role` is not specified, it will default to the   role specified by the config setting   `Authorization.DefaultUserRole`.  #### SAML, OAuth2 (non-Google), PAM and Proxied Authentication  - An API Key must always be used. Users cannot use this   endpoint to create their own account. - Administrator access is always required to create accounts.  #### Password Authentication  - Users must confirm their account through an email. This   feature is unique to password authentication. - Administrator access is always required except for the first   created user.
         * @summary Create a user from caller-supplied details (SAML, password, PAM, proxied, OAuth2 except with Google) 
         * @param {InlineObject17} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPushUser: async (user: InlineObject17, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'user' is not null or undefined
            if (user === null || user === undefined) {
                throw new RequiredError('user','Required parameter user was null or undefined when calling createPushUser.');
            }
            const localVarPath = `/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof user !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(user !== undefined ? user : {})
                : (user || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information on the requesting user.
         * @summary Get current user details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentUser: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/user`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get detailed information on a specific user.  The `email` field is not populated for non-admins when `Server.HideEmailAddresses` is enabled.
         * @summary Get user details
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getUser.');
            }
            const localVarPath = `/v1/users/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint lists local users. When called with a prefix parameter, it searches for local users matching the prefix.  Results are sorted by first name, then last name, then username, then email. `prefix` searches are first sorted based on similarity to the prefix and then by first name, last name, username, email. The `prefix` can also be an exact match for the user\'s DN (for LDAP) or the auth provider\'s unique ID for the user, if any.  - Administrator access is required for filtering by   `account_status`. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.  Note that searching by `prefix` will always return the first page of results.
         * @summary List or search for user details
         * @param {string} [prefix] Filters users by prefix (username, first name, or last name). The filter is case insensitive.
         * @param {'administrator' | 'publisher' | 'viewer'} [userRole] Filter by user role. \&quot;|\&quot; represents logical OR. For example, &#x60;user_role&#x3D;viewer|publisher&#x60; means users who are either a viewer or a publisher will be included in the result.  Note that for &#x60;user_role&#x60;, logical AND is also supported but always returns no results. For example, &#x60;user_role&#x3D;viewer&amp;user_role&#x3D;publisher&#x60; tries to return users who are both viewers and publishers.
         * @param {'locked' | 'licensed' | 'inactive'} [accountStatus] Filter by account status. \&quot;|\&quot; represents logical OR. For example, &#x60;account_status&#x3D;locked|licensed&#x60; means users who are either locked or licensed. - &#x60;locked&#x60; - Users with a locked account. - &#x60;licensed&#x60; - Users regarded as licensed (unlocked and   recently active). - &#x60;inactive&#x60; - Users not locked and not recently active.  Note that for &#x60;account_status&#x60;, logical AND is also supported but always returns no results. For example, &#x60;account_status&#x3D;locked&amp;account_status&#x3D;licensed&#x60; tries to return users who are both locked and licensed.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough users to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {boolean} [ascOrder] Whether or not to return the users in ascending order, sorted by first name, last name, username, and email.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsers: async (prefix?: string, userRole?: 'administrator' | 'publisher' | 'viewer', accountStatus?: 'locked' | 'licensed' | 'inactive', pageNumber?: number, pageSize?: number, ascOrder?: boolean, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (prefix !== undefined) {
                localVarQueryParameter['prefix'] = prefix;
            }

            if (userRole !== undefined) {
                localVarQueryParameter['user_role'] = userRole;
            }

            if (accountStatus !== undefined) {
                localVarQueryParameter['account_status'] = accountStatus;
            }

            if (pageNumber !== undefined) {
                localVarQueryParameter['page_number'] = pageNumber;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['page_size'] = pageSize;
            }

            if (ascOrder !== undefined) {
                localVarQueryParameter['asc_order'] = ascOrder;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint locks or unlocks a given user account.  - License limits are taken into account when unlocking a user. - Administrator access is required to access this endpoint. - You cannot lock or unlock yourself.
         * @summary Lock a user
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {InlineObject19} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lockUser: async (guid: string, request: InlineObject19, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling lockUser.');
            }
            // verify required parameter 'request' is not null or undefined
            if (request === null || request === undefined) {
                throw new RequiredError('request','Required parameter request was null or undefined when calling lockUser.');
            }
            const localVarPath = `/v1/users/{guid}/lock`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof request !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(request !== undefined ? request : {})
                : (request || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint is used to support operations against users who do not have an RStudio Connect account, such as <a href=\"#put-/v1/users\" onclick=\"linkClick\">creating LDAP and OAuth2 with Google users</a> See <a href=\"#get-/v1/users\" onclick=\"linkClick\">GET /v1/users</a> for listing users.  This endpoint searches for users on RStudio Connect and on your LDAP or OAuth2 with Google system.  Results are first sorted based on similarity to the `prefix` and then by first name, last name, username, and email.  - This endpoint can be used only by LDAP or OAuth2 with Google   authentication and will return an error otherwise. - Publisher or administrator access is required to access this   endpoint. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.
         * @summary Search for user details from a remote provider
         * @param {string} prefix Search users by prefix (username, first name, or last name). &#x60;prefix&#x60; is case insensitive.
         * @param {number} [limit] The maximum number of users to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchRemoteUsers: async (prefix: string, limit?: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'prefix' is not null or undefined
            if (prefix === null || prefix === undefined) {
                throw new RequiredError('prefix','Required parameter prefix was null or undefined when calling searchRemoteUsers.');
            }
            const localVarPath = `/v1/users/remote`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }

            if (prefix !== undefined) {
                localVarQueryParameter['prefix'] = prefix;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * This endpoint updates a given user and returns the updated user properties. Note that it returns only the properties that can be modified by this endpoint.  If the authentication provider allows it:  - a user can change their own user properties. - another user\'s properties can be changed with administrator   access. - The configuration setting `Authorization.UserInfoEditableBy`   controls whether or not non-admins can edit their own properties.  #### Password Authentication  - Emails are required. - Changing an unconfirmed user\'s email will cause the   confirmation email to be resent to the new email.
         * @summary Update a user
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {InlineObject18} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (guid: string, user: InlineObject18, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling updateUser.');
            }
            // verify required parameter 'user' is not null or undefined
            if (user === null || user === undefined) {
                throw new RequiredError('user','Required parameter user was null or undefined when calling updateUser.');
            }
            const localVarPath = `/v1/users/{guid}`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof user !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(user !== undefined ? user : {})
                : (user || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UsersApi - functional programming interface
 * @export
 */
export const UsersApiFp = function(configuration?: Configuration) {
    return {
        /**
         * This endpoint creates the given user on the RStudio Connect server.  - This endpoint is used only for LDAP and OAuth2 with Google   authentication. All other authentication providers should   use the    <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint. - Unlike the   <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint, publisher or administrator access is required to access this   endpoint.  #### User Creation Workflow on LDAP and OAuth2 with Google  This endpoint requires authentication, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect? The first user can be created by simply logging into RStudio Connect. The RStudio Connect Server API cannot be used to create the first user. Once logged in, you can create an API Key.  For LDAP and OAuth2 with Google, the API lets you identify an existing user in the LDAP or OAuth2 with Google system and create a corresponding account on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/users/remote\" onclick=\"linkClick\">GET /v1/users/remote</a>   endpoint. This   endpoint will return a list of potential matching accounts   in LDAP or OAuth2 with Google. A user with no account on RStudio Connect will   lack a `guid`. Note the `temp_ticket` for the desired user   account. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding account on RStudio Connect.  The [Create a User from LDAP/OAuth](../cookbook/users/#create-user-ldap-oauth2) recipe in the API Cookbook has sample code using this workflow.  #### LDAP and OAuth2 with Google Authentication  - The created user role will default to the role specified by   the config setting `Authorization.DefaultUserRole`.
         * @summary Create a user using details from a remote authentication provider (LDAP, OAuth2 with Google) 
         * @param {InlineObject16} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPullUser(request: InlineObject16, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).createPullUser(request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint creates the given user.  - This endpoint is used only for SAML, OAuth2 (non-Google), password, PAM, and proxied   authentication. All other authentication providers should   use the    <a href=\"#put-/v1/users\" onclick=\"linkClick\">PUT /v1/users</a>   endpoint. - Administrator access is required to create *other* users.  #### Initial User Creation Workflow  This endpoint requires authentication to create *other* users, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect?  - For password authentication, you can use this endpoint   without an API Key to create the first user. The first user   will be an administrator. - For SAML, OAuth2 (non-Google), PAM or proxied authentication, the first user can be   created by logging into RStudio Connect. The API cannot be used.  Once the first user is created, an API Key can be used to access this endpoint and create subsequent users. The [API Keys](../user/api-keys/) chapter of the RStudio Connect User Guide explains how to create an API Key.  #### All Authentication Providers  - When `user_role` is not specified, it will default to the   role specified by the config setting   `Authorization.DefaultUserRole`.  #### SAML, OAuth2 (non-Google), PAM and Proxied Authentication  - An API Key must always be used. Users cannot use this   endpoint to create their own account. - Administrator access is always required to create accounts.  #### Password Authentication  - Users must confirm their account through an email. This   feature is unique to password authentication. - Administrator access is always required except for the first   created user.
         * @summary Create a user from caller-supplied details (SAML, password, PAM, proxied, OAuth2 except with Google) 
         * @param {InlineObject17} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createPushUser(user: InlineObject17, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).createPushUser(user, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information on the requesting user.
         * @summary Get current user details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCurrentUser(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).getCurrentUser(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get detailed information on a specific user.  The `email` field is not populated for non-admins when `Server.HideEmailAddresses` is enabled.
         * @summary Get user details
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).getUser(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint lists local users. When called with a prefix parameter, it searches for local users matching the prefix.  Results are sorted by first name, then last name, then username, then email. `prefix` searches are first sorted based on similarity to the prefix and then by first name, last name, username, email. The `prefix` can also be an exact match for the user\'s DN (for LDAP) or the auth provider\'s unique ID for the user, if any.  - Administrator access is required for filtering by   `account_status`. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.  Note that searching by `prefix` will always return the first page of results.
         * @summary List or search for user details
         * @param {string} [prefix] Filters users by prefix (username, first name, or last name). The filter is case insensitive.
         * @param {'administrator' | 'publisher' | 'viewer'} [userRole] Filter by user role. \&quot;|\&quot; represents logical OR. For example, &#x60;user_role&#x3D;viewer|publisher&#x60; means users who are either a viewer or a publisher will be included in the result.  Note that for &#x60;user_role&#x60;, logical AND is also supported but always returns no results. For example, &#x60;user_role&#x3D;viewer&amp;user_role&#x3D;publisher&#x60; tries to return users who are both viewers and publishers.
         * @param {'locked' | 'licensed' | 'inactive'} [accountStatus] Filter by account status. \&quot;|\&quot; represents logical OR. For example, &#x60;account_status&#x3D;locked|licensed&#x60; means users who are either locked or licensed. - &#x60;locked&#x60; - Users with a locked account. - &#x60;licensed&#x60; - Users regarded as licensed (unlocked and   recently active). - &#x60;inactive&#x60; - Users not locked and not recently active.  Note that for &#x60;account_status&#x60;, logical AND is also supported but always returns no results. For example, &#x60;account_status&#x3D;locked&amp;account_status&#x3D;licensed&#x60; tries to return users who are both locked and licensed.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough users to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {boolean} [ascOrder] Whether or not to return the users in ascending order, sorted by first name, last name, username, and email.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUsers(prefix?: string, userRole?: 'administrator' | 'publisher' | 'viewer', accountStatus?: 'locked' | 'licensed' | 'inactive', pageNumber?: number, pageSize?: number, ascOrder?: boolean, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Users>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).getUsers(prefix, userRole, accountStatus, pageNumber, pageSize, ascOrder, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint locks or unlocks a given user account.  - License limits are taken into account when unlocking a user. - Administrator access is required to access this endpoint. - You cannot lock or unlock yourself.
         * @summary Lock a user
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {InlineObject19} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async lockUser(guid: string, request: InlineObject19, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).lockUser(guid, request, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint is used to support operations against users who do not have an RStudio Connect account, such as <a href=\"#put-/v1/users\" onclick=\"linkClick\">creating LDAP and OAuth2 with Google users</a> See <a href=\"#get-/v1/users\" onclick=\"linkClick\">GET /v1/users</a> for listing users.  This endpoint searches for users on RStudio Connect and on your LDAP or OAuth2 with Google system.  Results are first sorted based on similarity to the `prefix` and then by first name, last name, username, and email.  - This endpoint can be used only by LDAP or OAuth2 with Google   authentication and will return an error otherwise. - Publisher or administrator access is required to access this   endpoint. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.
         * @summary Search for user details from a remote provider
         * @param {string} prefix Search users by prefix (username, first name, or last name). &#x60;prefix&#x60; is case insensitive.
         * @param {number} [limit] The maximum number of users to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async searchRemoteUsers(prefix: string, limit?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RemoteSearchResults>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).searchRemoteUsers(prefix, limit, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * This endpoint updates a given user and returns the updated user properties. Note that it returns only the properties that can be modified by this endpoint.  If the authentication provider allows it:  - a user can change their own user properties. - another user\'s properties can be changed with administrator   access. - The configuration setting `Authorization.UserInfoEditableBy`   controls whether or not non-admins can edit their own properties.  #### Password Authentication  - Emails are required. - Changing an unconfirmed user\'s email will cause the   confirmation email to be resent to the new email.
         * @summary Update a user
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {InlineObject18} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(guid: string, user: InlineObject18, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<EditableUser>> {
            const localVarAxiosArgs = await UsersApiAxiosParamCreator(configuration).updateUser(guid, user, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * UsersApi - factory interface
 * @export
 */
export const UsersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * This endpoint creates the given user on the RStudio Connect server.  - This endpoint is used only for LDAP and OAuth2 with Google   authentication. All other authentication providers should   use the    <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint. - Unlike the   <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint, publisher or administrator access is required to access this   endpoint.  #### User Creation Workflow on LDAP and OAuth2 with Google  This endpoint requires authentication, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect? The first user can be created by simply logging into RStudio Connect. The RStudio Connect Server API cannot be used to create the first user. Once logged in, you can create an API Key.  For LDAP and OAuth2 with Google, the API lets you identify an existing user in the LDAP or OAuth2 with Google system and create a corresponding account on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/users/remote\" onclick=\"linkClick\">GET /v1/users/remote</a>   endpoint. This   endpoint will return a list of potential matching accounts   in LDAP or OAuth2 with Google. A user with no account on RStudio Connect will   lack a `guid`. Note the `temp_ticket` for the desired user   account. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding account on RStudio Connect.  The [Create a User from LDAP/OAuth](../cookbook/users/#create-user-ldap-oauth2) recipe in the API Cookbook has sample code using this workflow.  #### LDAP and OAuth2 with Google Authentication  - The created user role will default to the role specified by   the config setting `Authorization.DefaultUserRole`.
         * @summary Create a user using details from a remote authentication provider (LDAP, OAuth2 with Google) 
         * @param {InlineObject16} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPullUser(request: InlineObject16, options?: any): AxiosPromise<User> {
            return UsersApiFp(configuration).createPullUser(request, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint creates the given user.  - This endpoint is used only for SAML, OAuth2 (non-Google), password, PAM, and proxied   authentication. All other authentication providers should   use the    <a href=\"#put-/v1/users\" onclick=\"linkClick\">PUT /v1/users</a>   endpoint. - Administrator access is required to create *other* users.  #### Initial User Creation Workflow  This endpoint requires authentication to create *other* users, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect?  - For password authentication, you can use this endpoint   without an API Key to create the first user. The first user   will be an administrator. - For SAML, OAuth2 (non-Google), PAM or proxied authentication, the first user can be   created by logging into RStudio Connect. The API cannot be used.  Once the first user is created, an API Key can be used to access this endpoint and create subsequent users. The [API Keys](../user/api-keys/) chapter of the RStudio Connect User Guide explains how to create an API Key.  #### All Authentication Providers  - When `user_role` is not specified, it will default to the   role specified by the config setting   `Authorization.DefaultUserRole`.  #### SAML, OAuth2 (non-Google), PAM and Proxied Authentication  - An API Key must always be used. Users cannot use this   endpoint to create their own account. - Administrator access is always required to create accounts.  #### Password Authentication  - Users must confirm their account through an email. This   feature is unique to password authentication. - Administrator access is always required except for the first   created user.
         * @summary Create a user from caller-supplied details (SAML, password, PAM, proxied, OAuth2 except with Google) 
         * @param {InlineObject17} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createPushUser(user: InlineObject17, options?: any): AxiosPromise<User> {
            return UsersApiFp(configuration).createPushUser(user, options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information on the requesting user.
         * @summary Get current user details
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentUser(options?: any): AxiosPromise<User> {
            return UsersApiFp(configuration).getCurrentUser(options).then((request) => request(axios, basePath));
        },
        /**
         * Get detailed information on a specific user.  The `email` field is not populated for non-admins when `Server.HideEmailAddresses` is enabled.
         * @summary Get user details
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(guid: string, options?: any): AxiosPromise<User> {
            return UsersApiFp(configuration).getUser(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint lists local users. When called with a prefix parameter, it searches for local users matching the prefix.  Results are sorted by first name, then last name, then username, then email. `prefix` searches are first sorted based on similarity to the prefix and then by first name, last name, username, email. The `prefix` can also be an exact match for the user\'s DN (for LDAP) or the auth provider\'s unique ID for the user, if any.  - Administrator access is required for filtering by   `account_status`. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.  Note that searching by `prefix` will always return the first page of results.
         * @summary List or search for user details
         * @param {string} [prefix] Filters users by prefix (username, first name, or last name). The filter is case insensitive.
         * @param {'administrator' | 'publisher' | 'viewer'} [userRole] Filter by user role. \&quot;|\&quot; represents logical OR. For example, &#x60;user_role&#x3D;viewer|publisher&#x60; means users who are either a viewer or a publisher will be included in the result.  Note that for &#x60;user_role&#x60;, logical AND is also supported but always returns no results. For example, &#x60;user_role&#x3D;viewer&amp;user_role&#x3D;publisher&#x60; tries to return users who are both viewers and publishers.
         * @param {'locked' | 'licensed' | 'inactive'} [accountStatus] Filter by account status. \&quot;|\&quot; represents logical OR. For example, &#x60;account_status&#x3D;locked|licensed&#x60; means users who are either locked or licensed. - &#x60;locked&#x60; - Users with a locked account. - &#x60;licensed&#x60; - Users regarded as licensed (unlocked and   recently active). - &#x60;inactive&#x60; - Users not locked and not recently active.  Note that for &#x60;account_status&#x60;, logical AND is also supported but always returns no results. For example, &#x60;account_status&#x3D;locked&amp;account_status&#x3D;licensed&#x60; tries to return users who are both locked and licensed.
         * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
         * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough users to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {boolean} [ascOrder] Whether or not to return the users in ascending order, sorted by first name, last name, username, and email.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsers(prefix?: string, userRole?: 'administrator' | 'publisher' | 'viewer', accountStatus?: 'locked' | 'licensed' | 'inactive', pageNumber?: number, pageSize?: number, ascOrder?: boolean, options?: any): AxiosPromise<Users> {
            return UsersApiFp(configuration).getUsers(prefix, userRole, accountStatus, pageNumber, pageSize, ascOrder, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint locks or unlocks a given user account.  - License limits are taken into account when unlocking a user. - Administrator access is required to access this endpoint. - You cannot lock or unlock yourself.
         * @summary Lock a user
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {InlineObject19} request 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        lockUser(guid: string, request: InlineObject19, options?: any): AxiosPromise<void> {
            return UsersApiFp(configuration).lockUser(guid, request, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint is used to support operations against users who do not have an RStudio Connect account, such as <a href=\"#put-/v1/users\" onclick=\"linkClick\">creating LDAP and OAuth2 with Google users</a> See <a href=\"#get-/v1/users\" onclick=\"linkClick\">GET /v1/users</a> for listing users.  This endpoint searches for users on RStudio Connect and on your LDAP or OAuth2 with Google system.  Results are first sorted based on similarity to the `prefix` and then by first name, last name, username, and email.  - This endpoint can be used only by LDAP or OAuth2 with Google   authentication and will return an error otherwise. - Publisher or administrator access is required to access this   endpoint. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.
         * @summary Search for user details from a remote provider
         * @param {string} prefix Search users by prefix (username, first name, or last name). &#x60;prefix&#x60; is case insensitive.
         * @param {number} [limit] The maximum number of users to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        searchRemoteUsers(prefix: string, limit?: number, options?: any): AxiosPromise<RemoteSearchResults> {
            return UsersApiFp(configuration).searchRemoteUsers(prefix, limit, options).then((request) => request(axios, basePath));
        },
        /**
         * This endpoint updates a given user and returns the updated user properties. Note that it returns only the properties that can be modified by this endpoint.  If the authentication provider allows it:  - a user can change their own user properties. - another user\'s properties can be changed with administrator   access. - The configuration setting `Authorization.UserInfoEditableBy`   controls whether or not non-admins can edit their own properties.  #### Password Authentication  - Emails are required. - Changing an unconfirmed user\'s email will cause the   confirmation email to be resent to the new email.
         * @summary Update a user
         * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
         * @param {InlineObject18} user 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(guid: string, user: InlineObject18, options?: any): AxiosPromise<EditableUser> {
            return UsersApiFp(configuration).updateUser(guid, user, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UsersApi - object-oriented interface
 * @export
 * @class UsersApi
 * @extends {BaseAPI}
 */
export class UsersApi extends BaseAPI {
    /**
     * This endpoint creates the given user on the RStudio Connect server.  - This endpoint is used only for LDAP and OAuth2 with Google   authentication. All other authentication providers should   use the    <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint. - Unlike the   <a href=\"#post-/v1/users\" onclick=\"linkClick\">POST /v1/users</a>   endpoint, publisher or administrator access is required to access this   endpoint.  #### User Creation Workflow on LDAP and OAuth2 with Google  This endpoint requires authentication, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect? The first user can be created by simply logging into RStudio Connect. The RStudio Connect Server API cannot be used to create the first user. Once logged in, you can create an API Key.  For LDAP and OAuth2 with Google, the API lets you identify an existing user in the LDAP or OAuth2 with Google system and create a corresponding account on RStudio Connect. This is a two-step process:  - Use the    <a href=\"#get-/v1/users/remote\" onclick=\"linkClick\">GET /v1/users/remote</a>   endpoint. This   endpoint will return a list of potential matching accounts   in LDAP or OAuth2 with Google. A user with no account on RStudio Connect will   lack a `guid`. Note the `temp_ticket` for the desired user   account. - Use this PUT endpoint with the `temp_ticket` to create a   corresponding account on RStudio Connect.  The [Create a User from LDAP/OAuth](../cookbook/users/#create-user-ldap-oauth2) recipe in the API Cookbook has sample code using this workflow.  #### LDAP and OAuth2 with Google Authentication  - The created user role will default to the role specified by   the config setting `Authorization.DefaultUserRole`.
     * @summary Create a user using details from a remote authentication provider (LDAP, OAuth2 with Google) 
     * @param {InlineObject16} request 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public createPullUser(request: InlineObject16, options?: any) {
        return UsersApiFp(this.configuration).createPullUser(request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint creates the given user.  - This endpoint is used only for SAML, OAuth2 (non-Google), password, PAM, and proxied   authentication. All other authentication providers should   use the    <a href=\"#put-/v1/users\" onclick=\"linkClick\">PUT /v1/users</a>   endpoint. - Administrator access is required to create *other* users.  #### Initial User Creation Workflow  This endpoint requires authentication to create *other* users, which means that you need an API Key for access. How do you get an API Key if there are no users in RStudio Connect?  - For password authentication, you can use this endpoint   without an API Key to create the first user. The first user   will be an administrator. - For SAML, OAuth2 (non-Google), PAM or proxied authentication, the first user can be   created by logging into RStudio Connect. The API cannot be used.  Once the first user is created, an API Key can be used to access this endpoint and create subsequent users. The [API Keys](../user/api-keys/) chapter of the RStudio Connect User Guide explains how to create an API Key.  #### All Authentication Providers  - When `user_role` is not specified, it will default to the   role specified by the config setting   `Authorization.DefaultUserRole`.  #### SAML, OAuth2 (non-Google), PAM and Proxied Authentication  - An API Key must always be used. Users cannot use this   endpoint to create their own account. - Administrator access is always required to create accounts.  #### Password Authentication  - Users must confirm their account through an email. This   feature is unique to password authentication. - Administrator access is always required except for the first   created user.
     * @summary Create a user from caller-supplied details (SAML, password, PAM, proxied, OAuth2 except with Google) 
     * @param {InlineObject17} user 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public createPushUser(user: InlineObject17, options?: any) {
        return UsersApiFp(this.configuration).createPushUser(user, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information on the requesting user.
     * @summary Get current user details
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public getCurrentUser(options?: any) {
        return UsersApiFp(this.configuration).getCurrentUser(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get detailed information on a specific user.  The `email` field is not populated for non-admins when `Server.HideEmailAddresses` is enabled.
     * @summary Get user details
     * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public getUser(guid: string, options?: any) {
        return UsersApiFp(this.configuration).getUser(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint lists local users. When called with a prefix parameter, it searches for local users matching the prefix.  Results are sorted by first name, then last name, then username, then email. `prefix` searches are first sorted based on similarity to the prefix and then by first name, last name, username, email. The `prefix` can also be an exact match for the user\'s DN (for LDAP) or the auth provider\'s unique ID for the user, if any.  - Administrator access is required for filtering by   `account_status`. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.  #### Pagination  This endpoint uses offset pagination (using page numbers). The [Offset Pagination](../cookbook/pagination/#offset-pagination) recipe in the RStudio Connect API Cookbook has sample code for fetching multiple pages from a list endpoint.  Note that searching by `prefix` will always return the first page of results.
     * @summary List or search for user details
     * @param {string} [prefix] Filters users by prefix (username, first name, or last name). The filter is case insensitive.
     * @param {'administrator' | 'publisher' | 'viewer'} [userRole] Filter by user role. \&quot;|\&quot; represents logical OR. For example, &#x60;user_role&#x3D;viewer|publisher&#x60; means users who are either a viewer or a publisher will be included in the result.  Note that for &#x60;user_role&#x60;, logical AND is also supported but always returns no results. For example, &#x60;user_role&#x3D;viewer&amp;user_role&#x3D;publisher&#x60; tries to return users who are both viewers and publishers.
     * @param {'locked' | 'licensed' | 'inactive'} [accountStatus] Filter by account status. \&quot;|\&quot; represents logical OR. For example, &#x60;account_status&#x3D;locked|licensed&#x60; means users who are either locked or licensed. - &#x60;locked&#x60; - Users with a locked account. - &#x60;licensed&#x60; - Users regarded as licensed (unlocked and   recently active). - &#x60;inactive&#x60; - Users not locked and not recently active.  Note that for &#x60;account_status&#x60;, logical AND is also supported but always returns no results. For example, &#x60;account_status&#x3D;locked&amp;account_status&#x3D;licensed&#x60; tries to return users who are both locked and licensed.
     * @param {number} [pageNumber] The page to return relative to the given &#x60;page_size&#x60;. If &#x60;page_number&#x60; is 0 or negative, an error will be returned.
     * @param {number} [pageSize] The number of items to include in each page. This parameter is \&quot;best effort\&quot; since there may not be enough users to honor the request. If &#x60;page_size&#x60; is less than 1 or greater than 500, an error will be returned.
     * @param {boolean} [ascOrder] Whether or not to return the users in ascending order, sorted by first name, last name, username, and email.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public getUsers(prefix?: string, userRole?: 'administrator' | 'publisher' | 'viewer', accountStatus?: 'locked' | 'licensed' | 'inactive', pageNumber?: number, pageSize?: number, ascOrder?: boolean, options?: any) {
        return UsersApiFp(this.configuration).getUsers(prefix, userRole, accountStatus, pageNumber, pageSize, ascOrder, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint locks or unlocks a given user account.  - License limits are taken into account when unlocking a user. - Administrator access is required to access this endpoint. - You cannot lock or unlock yourself.
     * @summary Lock a user
     * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
     * @param {InlineObject19} request 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public lockUser(guid: string, request: InlineObject19, options?: any) {
        return UsersApiFp(this.configuration).lockUser(guid, request, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint is used to support operations against users who do not have an RStudio Connect account, such as <a href=\"#put-/v1/users\" onclick=\"linkClick\">creating LDAP and OAuth2 with Google users</a> See <a href=\"#get-/v1/users\" onclick=\"linkClick\">GET /v1/users</a> for listing users.  This endpoint searches for users on RStudio Connect and on your LDAP or OAuth2 with Google system.  Results are first sorted based on similarity to the `prefix` and then by first name, last name, username, and email.  - This endpoint can be used only by LDAP or OAuth2 with Google   authentication and will return an error otherwise. - Publisher or administrator access is required to access this   endpoint. - The `email` field is not populated for non-admins when   `Server.HideEmailAddresses` is enabled. - When the user making the request is a viewer and   `Authorization.ViewersCanOnlySeeThemselves` is being used,   the results contain only the given user.
     * @summary Search for user details from a remote provider
     * @param {string} prefix Search users by prefix (username, first name, or last name). &#x60;prefix&#x60; is case insensitive.
     * @param {number} [limit] The maximum number of users to include in the results. If &#x60;limit&#x60; is less than 1 or greater than 500, an error will be returned.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public searchRemoteUsers(prefix: string, limit?: number, options?: any) {
        return UsersApiFp(this.configuration).searchRemoteUsers(prefix, limit, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * This endpoint updates a given user and returns the updated user properties. Note that it returns only the properties that can be modified by this endpoint.  If the authentication provider allows it:  - a user can change their own user properties. - another user\'s properties can be changed with administrator   access. - The configuration setting `Authorization.UserInfoEditableBy`   controls whether or not non-admins can edit their own properties.  #### Password Authentication  - Emails are required. - Changing an unconfirmed user\'s email will cause the   confirmation email to be resent to the new email.
     * @summary Update a user
     * @param {string} guid The user\&#39;s GUID, or unique identifier  Example value &#x3D; &#x60;6f300623-1e0c-48e6-a473-ddf630c0c0c3&#x60; using UUID [RFC4122](https://tools.ietf.org/html/rfc4122) format.
     * @param {InlineObject18} user 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UsersApi
     */
    public updateUser(guid: string, user: InlineObject18, options?: any) {
        return UsersApiFp(this.configuration).updateUser(guid, user, options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * VanityURLsApi - axios parameter creator
 * @export
 */
export const VanityURLsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Delete the vanity URL for this content.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can delete the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.
         * @summary Delete vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteVanity: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling deleteVanity.');
            }
            const localVarPath = `/v1/content/{guid}/vanity`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Get the vanity URL, if any, defined for this content. If the content item has a vanity URL, it is returned. If there is no vanity URL for this content, a 404 status is returned.  Administrators can get the vanity URL for any content item. Any authenticated user who is authorized to view the content can get the vanity URL.
         * @summary Get vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getVanity: async (guid: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling getVanity.');
            }
            const localVarPath = `/v1/content/{guid}/vanity`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * List all defined vanity URLs.  You must have administrator privileges to perform this action.
         * @summary List vanity URLs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listVanities: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/vanities`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * Set the vanity URL for this content item.  A vanity URL path must meet certain requirements: * It must consist of alphanumeric characters, hyphens, underscores, and slashes. * It cannot be a reserved path such as the root path `/`, or a path beginning with `/__`. * The first path component cannot be an existing username, or a prohibited username.   See the [Admin Guide](../admin/authentication/#username-requirements) for details. * It cannot be an ancestor or descendant of an existing vanity URL path. For example,   if the vanity path `/a/b/` exists, you cannot add `/a/` or `/a/b/c/`.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can set the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.  You can reassign an existing vanity URL to a different content item, if you are an administrator or collaborator/owner of both content items. You must set the `force` parameter to `true` to reassign a URL. An error will be returned if `force` is `false` and the URL already exists.
         * @summary Set vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject6} vanity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setVanity: async (guid: string, vanity: InlineObject6, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'guid' is not null or undefined
            if (guid === null || guid === undefined) {
                throw new RequiredError('guid','Required parameter guid was null or undefined when calling setVanity.');
            }
            // verify required parameter 'vanity' is not null or undefined
            if (vanity === null || vanity === undefined) {
                throw new RequiredError('vanity','Required parameter vanity was null or undefined when calling setVanity.');
            }
            const localVarPath = `/v1/content/{guid}/vanity`
                .replace(`{${"guid"}}`, encodeURIComponent(String(guid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PUT', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication apiKey required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("Authorization")
                    : await configuration.apiKey;
                localVarHeaderParameter["Authorization"] = localVarApiKeyValue;
            }


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            const queryParameters = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                queryParameters.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                queryParameters.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(queryParameters)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const nonString = typeof vanity !== 'string';
            const needsSerialization = nonString && configuration && configuration.isJsonMime
                ? configuration.isJsonMime(localVarRequestOptions.headers['Content-Type'])
                : nonString;
            localVarRequestOptions.data =  needsSerialization
                ? JSON.stringify(vanity !== undefined ? vanity : {})
                : (vanity || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * VanityURLsApi - functional programming interface
 * @export
 */
export const VanityURLsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * Delete the vanity URL for this content.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can delete the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.
         * @summary Delete vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteVanity(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await VanityURLsApiAxiosParamCreator(configuration).deleteVanity(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Get the vanity URL, if any, defined for this content. If the content item has a vanity URL, it is returned. If there is no vanity URL for this content, a 404 status is returned.  Administrators can get the vanity URL for any content item. Any authenticated user who is authorized to view the content can get the vanity URL.
         * @summary Get vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getVanity(guid: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await VanityURLsApiAxiosParamCreator(configuration).getVanity(guid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * List all defined vanity URLs.  You must have administrator privileges to perform this action.
         * @summary List vanity URLs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listVanities(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<InlineResponse2006>>> {
            const localVarAxiosArgs = await VanityURLsApiAxiosParamCreator(configuration).listVanities(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * Set the vanity URL for this content item.  A vanity URL path must meet certain requirements: * It must consist of alphanumeric characters, hyphens, underscores, and slashes. * It cannot be a reserved path such as the root path `/`, or a path beginning with `/__`. * The first path component cannot be an existing username, or a prohibited username.   See the [Admin Guide](../admin/authentication/#username-requirements) for details. * It cannot be an ancestor or descendant of an existing vanity URL path. For example,   if the vanity path `/a/b/` exists, you cannot add `/a/` or `/a/b/c/`.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can set the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.  You can reassign an existing vanity URL to a different content item, if you are an administrator or collaborator/owner of both content items. You must set the `force` parameter to `true` to reassign a URL. An error will be returned if `force` is `false` and the URL already exists.
         * @summary Set vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject6} vanity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async setVanity(guid: string, vanity: InlineObject6, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>> {
            const localVarAxiosArgs = await VanityURLsApiAxiosParamCreator(configuration).setVanity(guid, vanity, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * VanityURLsApi - factory interface
 * @export
 */
export const VanityURLsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * Delete the vanity URL for this content.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can delete the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.
         * @summary Delete vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteVanity(guid: string, options?: any): AxiosPromise<void> {
            return VanityURLsApiFp(configuration).deleteVanity(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * Get the vanity URL, if any, defined for this content. If the content item has a vanity URL, it is returned. If there is no vanity URL for this content, a 404 status is returned.  Administrators can get the vanity URL for any content item. Any authenticated user who is authorized to view the content can get the vanity URL.
         * @summary Get vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getVanity(guid: string, options?: any): AxiosPromise<InlineResponse200> {
            return VanityURLsApiFp(configuration).getVanity(guid, options).then((request) => request(axios, basePath));
        },
        /**
         * List all defined vanity URLs.  You must have administrator privileges to perform this action.
         * @summary List vanity URLs
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listVanities(options?: any): AxiosPromise<Array<InlineResponse2006>> {
            return VanityURLsApiFp(configuration).listVanities(options).then((request) => request(axios, basePath));
        },
        /**
         * Set the vanity URL for this content item.  A vanity URL path must meet certain requirements: * It must consist of alphanumeric characters, hyphens, underscores, and slashes. * It cannot be a reserved path such as the root path `/`, or a path beginning with `/__`. * The first path component cannot be an existing username, or a prohibited username.   See the [Admin Guide](../admin/authentication/#username-requirements) for details. * It cannot be an ancestor or descendant of an existing vanity URL path. For example,   if the vanity path `/a/b/` exists, you cannot add `/a/` or `/a/b/c/`.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can set the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.  You can reassign an existing vanity URL to a different content item, if you are an administrator or collaborator/owner of both content items. You must set the `force` parameter to `true` to reassign a URL. An error will be returned if `force` is `false` and the URL already exists.
         * @summary Set vanity URL
         * @param {string} guid The unique identifier of the desired content item.
         * @param {InlineObject6} vanity 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setVanity(guid: string, vanity: InlineObject6, options?: any): AxiosPromise<InlineResponse2001> {
            return VanityURLsApiFp(configuration).setVanity(guid, vanity, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * VanityURLsApi - object-oriented interface
 * @export
 * @class VanityURLsApi
 * @extends {BaseAPI}
 */
export class VanityURLsApi extends BaseAPI {
    /**
     * Delete the vanity URL for this content.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can delete the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.
     * @summary Delete vanity URL
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VanityURLsApi
     */
    public deleteVanity(guid: string, options?: any) {
        return VanityURLsApiFp(this.configuration).deleteVanity(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Get the vanity URL, if any, defined for this content. If the content item has a vanity URL, it is returned. If there is no vanity URL for this content, a 404 status is returned.  Administrators can get the vanity URL for any content item. Any authenticated user who is authorized to view the content can get the vanity URL.
     * @summary Get vanity URL
     * @param {string} guid The unique identifier of the desired content item.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VanityURLsApi
     */
    public getVanity(guid: string, options?: any) {
        return VanityURLsApiFp(this.configuration).getVanity(guid, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * List all defined vanity URLs.  You must have administrator privileges to perform this action.
     * @summary List vanity URLs
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VanityURLsApi
     */
    public listVanities(options?: any) {
        return VanityURLsApiFp(this.configuration).listVanities(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * Set the vanity URL for this content item.  A vanity URL path must meet certain requirements: * It must consist of alphanumeric characters, hyphens, underscores, and slashes. * It cannot be a reserved path such as the root path `/`, or a path beginning with `/__`. * The first path component cannot be an existing username, or a prohibited username.   See the [Admin Guide](../admin/authentication/#username-requirements) for details. * It cannot be an ancestor or descendant of an existing vanity URL path. For example,   if the vanity path `/a/b/` exists, you cannot add `/a/` or `/a/b/c/`.  If `Authorization.PublishersCanManageVanities` is `true`, publishers can set the vanity URL for content items that they have permission to change. Otherwise, administrator permissions are required.  You can reassign an existing vanity URL to a different content item, if you are an administrator or collaborator/owner of both content items. You must set the `force` parameter to `true` to reassign a URL. An error will be returned if `force` is `false` and the URL already exists.
     * @summary Set vanity URL
     * @param {string} guid The unique identifier of the desired content item.
     * @param {InlineObject6} vanity 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VanityURLsApi
     */
    public setVanity(guid: string, vanity: InlineObject6, options?: any) {
        return VanityURLsApiFp(this.configuration).setVanity(guid, vanity, options).then((request) => request(this.axios, this.basePath));
    }
}


