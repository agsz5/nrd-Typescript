"use strict";
function transformBandData(band) {
    const allMembers = [...band.members.current, ...band.members.past];
    // lowercase and sort all members by age (DESC) and name (ASC)
    const allMembersLowerCase = allMembers.map((member) => member.name.toLowerCase());
    allMembersLowerCase.sort((a, b) => {
        const memberA = allMembers.find((member) => member.name.toLowerCase().includes(a));
        const memberB = allMembers.find((member) => member.name.toLowerCase().includes(b));
        if (!memberA || !memberB) {
            return 0;
        }
        if (memberA.age !== memberB.age) {
            return memberB.age - memberA.age;
        }
        return memberA.name.localeCompare(memberB.name);
    });
    // get unique plays
    const plays = {};
    allMembers.forEach((member) => {
        member.plays.forEach((play) => {
            if (!plays[play]) {
                plays[play] = [];
            }
            plays[play].push(member.name.toLowerCase());
        });
    });
    // lowercase and sort member names for each play
    Object.entries(plays).forEach(([play, members]) => {
        members.sort();
    });
    const all = allMembersLowerCase;
    return {
        members: {
            current: band.members.current,
            past: band.members.past,
        },
        all,
        plays
    };
}
// Data
const band = {
    members: {
        current: [
            { name: 'Sascha', age: 59, plays: ['vocals', 'synth', 'guitar', 'bass'] },
            { name: 'Lucia', age: 49, plays: ['vocals', 'synth'] },
            { name: 'Jules', age: 53, plays: ['guitar', 'bass', 'synth'] },
            { name: 'Steve', age: 55, plays: ['guitar'] },
        ],
        past: [
            { name: 'Raymond', age: 57, plays: ['vocals', 'synth'] },
            { name: 'En', age: 52, plays: ['vocals', 'drums', 'guitar', 'synth'] },
            { name: 'Gunter', age: 57, plays: ['guitar', 'synth'] },
        ],
    },
};
const newBandData = transformBandData(band);
console.log("Transformed array: ", JSON.stringify(newBandData, null, 2));
