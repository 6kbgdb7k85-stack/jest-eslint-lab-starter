const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    it('capitalizes the first letter of each word', () => {
        const stringIn = 'hello world';
        const stringOut = capitalizeWords(stringIn);
        expect(stringOut).toBe('Hello World');
    });
    it('capitalizes when joined with -', () => {
        const stringIn = 'hello-world';
        const stringOut = capitalizeWords(stringIn);
        expect(stringOut).toBe('Hello-World');
    });
    it('handles empty string gracefully', () => {
        const stringIn = '';
        const stringOut = capitalizeWords(stringIn);
        expect(stringOut).toBe('');
    });
    it('handles single words correctly', () => {
        const stringIn = 'hello';
        const stringOut = capitalizeWords(stringIn);
        expect(stringOut).toBe('Hello');
    });
});

describe('filterActiveUsers', () => {
    it('returns only active users', () => {
        const users = [
            { name: 'test1', isActive: true },
            { name: 'test2', isActive: false },
        ];
        const filteredUsers = filterActiveUsers(users);
        expect(filteredUsers).toStrictEqual([users[0]]);
    });
    it('returns empty array when given all inactive users', () => {
        const users = [
            { name: 'test1', isActive: false },
            { name: 'test2', isActive: false },
        ];
        const filteredUsers = filterActiveUsers(users);
        expect(filteredUsers).toStrictEqual([]);
    });
    it('returns empty array when given single user and they are inactive',()=>{
        const users = [
            { name: 'test1', isActive: false },
        ];
        const filteredUsers = filterActiveUsers(users);
        expect(filteredUsers).toStrictEqual([]);
    })
    it('returns array with single active user when given only one user and they are active',()=>{
        const users = [
            {name:'test1',isActive:true}
        ]
        const filteredUsers=filterActiveUsers(users)
        expect(filteredUsers).toStrictEqual(users);
    })
    it('handles empty array gracefully', () => {
        expect(filterActiveUsers([])).toStrictEqual([]);
    });
});

describe('logAction', () => {
    let mockDate;
    beforeEach(() => {
        mockDate = new Date('2026-06-10');
        jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
    });
    afterEach(() => {
        Date.mockRestore();
    });
    it('returns log containing username and action', () => {
        const action = 'testAction';
        const user = 'testUser';
        const log = logAction(action, user);
        expect(log).toBe(
            'User testUser performed testAction at 2026-06-10T00:00:00.000Z',
        );
    });
    it('handles missing inputs gracefully', () => {
        const log = logAction();
        expect(log).toBe(
            'User undefined performed undefined at 2026-06-10T00:00:00.000Z',
        );
    });
    it('handles null inputs gracefully', () => {
        const log = logAction(null,null);
        expect(log).toBe('User null performed null at 2026-06-10T00:00:00.000Z');
    });
    it('handles empty strings gracefully', () => {
        const log = logAction('', '');
        expect(log).toBe('User  performed  at 2026-06-10T00:00:00.000Z');
    });
});
