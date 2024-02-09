import { axiosInstance } from "util/axios/AxiosInstance";

const getEvidenceInTruthRoom = async (challengeId, setEvidences) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/evidence/truth-room/${challengeId}`
        );
        const data = await response.data;
        if (response.status === 200) {
            console.log(data.list);
            setEvidences(data.list);
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};

const getTestimoniesInTruthRoom = async (challengeId, setTestimonies) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/testimony/truth-room/${challengeId}`
        );
        const data = await response.data;
        if (response.status === 200) {
            console.log(data.list);
            setTestimonies(data.list);
        }
    } catch (error) {
        console.log(error);
    }

    return null;
};

const postEvidence = async (evidence) => {
    try {
        const formData = new FormData();
        formData.append("challengeId", evidence.challengeId);
        formData.append("title", evidence.title);
        formData.append("image", evidence.image);

        const response = await axiosInstance.postForm(
            `/v1/proof/evidence`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status === 200) {
            console.log("증거 생성 완료");
        }
    } catch (error) {
        console.log(error);
    }
};

const getEvidences = async (challengeId, setEvidences) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/evidence/${challengeId}`
        );

        if (response.status === 200) {
            const list = response.data.list;
            setEvidences(list);
        }
    } catch (error) {
        console.log(error);
    }
};

const getEvidenceDetail = async (evidenceId, setEvidence) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/evidence/detail/${evidenceId}`
        );

        if (response.status === 200) {
            const { evidence } = response.data;
            setEvidence(evidence);
        }
    } catch (error) {
        console.log(error);
    }
};
const getTestimonies = async (challengeId, setTestimonies) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/testimony/${challengeId}`
        );
        const list = await response.data.list;
        setTestimonies(list);
    } catch (error) {
        console.log(error);
    }
};

const getTestimonyDetail = async (testimonyId, setTestimony) => {
    try {
        const response = await axiosInstance.get(
            `/v1/proof/testimony/detail/${testimonyId}`
        );
        if (response.status === 200) {
            const { testimony } = await response.data;
            setTestimony(testimony);
        }
    } catch (error) {
        console.log(error);
    }
};

const postTestimony = async (testimony, challengeId) => {
    try {
        const requestBody = {
            title: testimony.title,
            content: testimony.content,
            challengeId: challengeId,
        };
        const response = await axiosInstance.post(
            `/v1/proof/testimony`,
            requestBody
        );
        if (response.status === 200) {
            console.log("증언 추가 됨");
        }
    } catch (error) {}
};

export {
    getTestimonies,
    getEvidenceDetail,
    getEvidences,
    postEvidence,
    getEvidenceInTruthRoom,
    getTestimoniesInTruthRoom,
    getTestimonyDetail,
    postTestimony,
};
