import { NextApiRequest, NextApiResponse } from 'next';

interface ParsedBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    branchOfService?: string;
    yearJoined?: string;
    yearSeparated?: string;
    linkedInAccountName?: string;
    githubAccountName?: string;
    preworkLink?: string;
    preworkRepo?: string;
    [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const parsedBody: ParsedBody = JSON.parse(req.body);
    const {
        firstName,
        lastName,
        email,
        city,
        state,
        zipCode,
        country,
        branchOfService,
        yearJoined,
        yearSeparated,
        linkedInAccountName,
        githubAccountName,
        preworkLink,
        preworkRepo,
    } = parsedBody;

    const requiredParams: string[] = [
        'firstName',
        'lastName',
        'email',
        'city',
        'state',
        'zipCode',
        'country',
        'branchOfService',
        'yearJoined',
        'yearSeparated',
        'linkedInAccountName',
        'githubAccountName',
        'preworkLink',
        'preworkRepo',
    ];
    
    // Your code logic goes here
    
}
   
