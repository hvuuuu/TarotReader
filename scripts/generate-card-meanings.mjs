import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const cardsJsonPath = path.join(rootDir, 'src', 'data', 'cards.json');
const outputPath = path.join(rootDir, 'src', 'data', 'cardMeanings.ts');

const cards = JSON.parse(fs.readFileSync(cardsJsonPath, 'utf8'));

// Curated archetypal meanings for all 22 Major Arcana
const MAJOR_MEANINGS = {
  "1": { // The Fool
    summary: {
      en: "The archetype of pure potential, fresh beginnings, and courage to step into the unknown without fear.",
      vi: "Biểu tượng của tiềm năng vô tận, khởi đầu tinh khôi và lòng dũng cảm bước vào hành trình mới không sợ hãi."
    },
    upright: {
      en: "Embrace the beginner's mindset. Trust your intuition and take a calculated leap of faith into new possibilities.",
      vi: "Đón nhận tâm thế người mới bắt đầu. Tin vào trực giác và can đảm dấn thân vào những cơ hội mới mở ra."
    },
    reversed: {
      en: "Signals reckless impulses or hesitation rooted in fear. Pause to assess whether you are leaping blindly or holding back needlessly.",
      vi: "Cảnh báo sự bốc đồng liều lĩnh hoặc do dự do nỗi sợ mơ hồ. Hãy dừng lại để nhìn nhận bạn đang hấp tấp hay quá ngần ngại."
    }
  },
  "2": { // The Magician
    summary: {
      en: "The archetype of focused agency, active manifestation, and aligning your internal will with outer reality.",
      vi: "Biểu tượng của tính chủ động, năng lực hiện thực hóa và sự đồng điệu giữa ý chí nội tâm với hành động thực tế."
    },
    upright: {
      en: "You hold the tools and personal capability required to shape your path. Concentrate your focus and act deliberately.",
      vi: "Bạn đã có đủ công cụ và năng lực để định hình con đường của mình. Hãy tập trung ý chí và hành động có chủ đích."
    },
    reversed: {
      en: "Scattered intentions, self-doubt, or manipulative tendencies. Realign with your authentic integrity and reconnect with your inner skills.",
      vi: "Ý chí bị phân tán, thiếu tự tin hoặc có xu hướng thao túng. Hãy trở về với sự chân thật và khơi dậy tiềm năng sẵn có."
    }
  },
  "3": { // The High Priestess
    summary: {
      en: "The guardian of subconscious wisdom, quiet discernment, inner stillness, and intuitive knowing.",
      vi: "Người canh giữ trí tuệ tiềm thức, trực giác tĩnh lặng và sự thấu suốt sâu sắc từ bên trong."
    },
    upright: {
      en: "Listen to the quiet voice within. Trust emotional cues and allow answers to emerge through stillness rather than force.",
      vi: "Lắng nghe tiếng nói trầm tĩnh của nội tâm. Hãy tin trực giác và để câu trả lời tự nhiên xuất hiện qua sự tĩnh lặng."
    },
    reversed: {
      en: "Suppressed intuition, superficial distractions, or ignoring subtle emotional warnings. Step away from external noise to find clarity.",
      vi: "Trực giác bị đè nén, xao nhãng bởi tiếng ồn bên ngoài hoặc né tránh cảm xúc. Hãy dành không gian tĩnh tâm để tìm lại sáng suốt."
    }
  },
  "4": { // The Empress
    summary: {
      en: "The archetype of fertile creativity, nurturing care, sensual abundance, and organic self-compassion.",
      vi: "Biểu tượng của sự nuôi dưỡng, sáng tạo trù phú, lòng trắc ẩn và sự hòa hợp dịu dàng với tự nhiên."
    },
    upright: {
      en: "Cultivate what nourishes your spirit. Prioritize care, creative expression, and gentleness with yourself and others.",
      vi: "Nuôi dưỡng những điều đem lại sức sống cho tâm hồn. Hãy chú trọng sự chăm sóc, sáng tạo và lòng dịu dàng với chính mình."
    },
    reversed: {
      en: "Creative stagnation, neglecting self-care, or over-giving at the expense of your own emotional reserves. Refill your cup first.",
      vi: "Bế tắc sáng tạo, bỏ bê việc chăm sóc bản thân hoặc hy sinh kiệt sức. Hãy ưu tiên tái tạo năng lượng cho chính bạn trước."
    }
  },
  "5": { // The Emperor
    summary: {
      en: "The archetype of structured clarity, grounded boundaries, rational leadership, and protective stability.",
      vi: "Biểu tượng của trật tự vững chãi, ranh giới rõ ràng, kỷ luật tự thân và tư duy thiết lập nền tảng ổn định."
    },
    upright: {
      en: "Establish healthy boundaries, logical structure, and firm discipline. Step up to direct your circumstances with mature authority.",
      vi: "Thiết lập ranh giới lành mạnh và kế hoạch rõ ràng. Đứng lên làm chủ hoàn cảnh bằng sự điềm tĩnh và kỷ luật tự giác."
    },
    reversed: {
      en: "Rigidity, excessive control, or feeling powerless against external disorder. Balance firmness with flexibility and empathy.",
      vi: "Sự kiểm soát quá mức, cứng nhắc hoặc cảm giác bất an khi mất kiểm soát. Hãy linh hoạt và lắng nghe thay vì cố áp đặt."
    }
  },
  "6": { // The Hierophant
    summary: {
      en: "The archetype of shared traditions, ethical frameworks, mentorship, and seeking deeper philosophical meaning.",
      vi: "Biểu tượng của tri thức nền tảng, hệ giá trị cốt lõi, người dẫn dắt và sự tìm kiếm ý nghĩa đạo đức sâu sắc."
    },
    upright: {
      en: "Examine core values, seek wise counsel or established knowledge, and align your choices with lasting principles.",
      vi: "Nhìn nhận các giá trị cốt lõi, tìm kiếm lời khuyên từ người có kinh nghiệm và neo đậu vào những nguyên tắc bền vững."
    },
    reversed: {
      en: "Dogmatic conformity, outdated beliefs, or questioning institutional norms. Forge your personal philosophy with discernment.",
      vi: "Sự gò bó giáo điều, niềm tin lỗi thời hoặc thôi thúc bứt phá khỏi định kiến cũ để xây dựng hệ giá trị chân thực cho riêng mình."
    }
  },
  "7": { // The Lovers
    summary: {
      en: "The archetype of meaningful values alignment, profound relational mirror, and conscious moral choices.",
      vi: "Biểu tượng của sự gắn kết giá trị, tấm gương phản chiếu qua mối quan hệ và những lựa chọn đạo đức có ý thức."
    },
    upright: {
      en: "Harmony between desires and values. Make conscious choices rooted in mutual respect, vulnerability, and authenticity.",
      vi: "Sự hòa hợp giữa mong muốn và giá trị sống. Hãy đưa ra quyết định dựa trên sự chân thành, thấu hiểu và tôn trọng song phương."
    },
    reversed: {
      en: "Internal conflict, misaligned expectations, or avoidance of a difficult decision. Clarify what you truly value above temporary convenience.",
      vi: "Xung đột nội tâm, rạn nứt vì kỳ vọng lệch pha hoặc trốn tránh một quyết định quan trọng. Hãy làm rõ điều gì thực sự ý nghĩa với bạn."
    }
  },
  "8": { // The Chariot
    summary: {
      en: "The archetype of integrated drive, focused willpower, overcoming opposing tensions, and purposeful momentum.",
      vi: "Biểu tượng của ý chí kiên định, sự hợp nhất các động lực trái chiều và tiến bước với mục tiêu rõ ràng."
    },
    upright: {
      en: "Harness dual impulses into unified direction. Maintain disciplined focus and confidence through current challenges.",
      vi: "Kết hợp các mong muốn trái ngược thành một hướng đi thống nhất. Giữ vững kỷ luật và niềm tin để vượt qua thử thách."
    },
    reversed: {
      en: "Loss of direction, aggressive forcefulness, or feeling overwhelmed by obstacles. Slow down and regain control over your inner steering wheel.",
      vi: "Mất phương hướng, hành động nôn nóng thái quá hoặc bị áp lực cuốn đi. Hãy giảm tốc để lấy lại quyền kiểm soát tâm trí."
    }
  },
  "9": { // Strength
    summary: {
      en: "The archetype of gentle courage, mastering instinct with compassion, emotional resilience, and quiet endurance.",
      vi: "Biểu tượng của sự dũng cảm dịu dàng, chế ngự bản năng bằng lòng trắc ẩn và sự kiên nhẫn nội tâm bền bỉ."
    },
    upright: {
      en: "True power comes from gentle persistence and self-acceptance, not brute force. Tame inner anxieties with patient empathy.",
      vi: "Sức mạnh đích thực đến từ sự kiên nhẫn và thấu hiểu bản thân, không phải bạo lực. Hãy đối thoại dịu dàng với nỗi sợ của mình."
    },
    reversed: {
      en: "Depleted emotional reserves, self-criticism, or letting raw fear overpower reason. Reassure yourself and cultivate gentle self-compassion.",
      vi: "Cạn kiệt năng lượng tinh thần, tự chỉ trích bản thân hoặc để nỗi sợ lấn át. Hãy dừng lại để chăm sóc và động viên chính mình."
    }
  },
  "10": { // The Hermit
    summary: {
      en: "The archetype of introspective solitude, seeking inner truth, stepping back from noise to find internal illumination.",
      vi: "Biểu tượng của sự chiêm nghiệm tĩnh lặng, tìm kiếm sự thật nội tâm và lùi lại để thấu suốt bản thân."
    },
    upright: {
      en: "A period of solitary reflection brings essential wisdom. Look inward to illuminate the next step rather than seeking validation outside.",
      vi: "Khoảng lặng để nhìn lại chính mình mang đến tuệ giác cần thiết. Hãy lắng nghe ngọn đèn dẫn lối từ bên trong bạn."
    },
    reversed: {
      en: "Isolating into rumination, loneliness, or stubbornly shutting others out. Distinguish between fruitful reflection and unhealthy withdrawal.",
      vi: "Sự cô lập tiêu cực, tự giam mình trong suy nghĩ quẩn quanh hoặc khép kín quá mức. Hãy mở lòng kết nối lại khi cần thiết."
    }
  },
  "11": { // Wheel of Fortune
    summary: {
      en: "The archetype of cyclical change, impermanence, recognizing systemic shifts, and finding stability at the center of life's rotation.",
      vi: "Biểu tượng của quy luật tuần hoàn, tính vô thường và khả năng giữ vững tâm thế bình thản giữa những thăng trầm cuộc sống."
    },
    upright: {
      en: "Life is shifting. Adapt with flexibility and grace, focusing on what is within your control while releasing fixation on the inevitable cycles.",
      vi: "Thời thế và hoàn cảnh đang chuyển động. Hãy linh hoạt thích ứng, tập trung vào việc bạn kiểm soát được và chấp nhận sự đổi thay."
    },
    reversed: {
      en: "Resisting natural transitions, feeling victimized by bad timing, or clinging to the past. Accept the cycle to regain your footing.",
      vi: "Kháng cự sự thay đổi, cảm giác bất lực trước hoàn cảnh hoặc bám víu điều đã qua. Hãy buông tay để tìm lại sự chủ động mới."
    }
  },
  "12": { // Justice
    summary: {
      en: "The archetype of honest accountability, clarity of truth, cause and effect, and rational equilibrium.",
      vi: "Biểu tượng của sự công bằng, minh bạch, luật nhân quả và cái nhìn khách quan không thiên vị."
    },
    upright: {
      en: "Examine facts dispassionately. Own your choices and seek fair, balanced outcomes built on honesty and integrity.",
      vi: "Nhìn nhận sự việc bằng con mắt khách quan. Chịu trách nhiệm với các quyết định của mình và hướng đến sự công bằng, minh bạch."
    },
    reversed: {
      en: "Cognitive bias, avoiding accountability, or enduring unfair treatment. Strive for internal fairness and honest acknowledgment of truth.",
      vi: "Định kiến thiên vị, trốn tránh trách nhiệm hoặc cảm thấy bất công. Hãy trung thực với chính mình trước khi phán xét ngoại cảnh."
    }
  },
  "13": { // The Hanged Man
    summary: {
      en: "The archetype of fruitful pause, voluntary surrender, shifting perspective, and yielding ego control for greater insight.",
      vi: "Biểu tượng của khoảng lặng tự nguyện, buông bỏ sự kiểm soát của cái tôi và nhìn nhận sự việc dưới góc nhìn hoàn toàn mới."
    },
    upright: {
      en: "Suspend urgency. By surrendering the struggle and looking at the situation upside down, profound new insights reveal themselves.",
      vi: "Tạm dừng sự vội vã. Khi bạn chấp nhận buông lỏng và nhìn sự việc từ góc độ khác, giải pháp bất ngờ sẽ tự hiển lộ."
    },
    reversed: {
      en: "Pointless sacrifice, stubborn stagnation, or resisting a necessary pause. Ask whether your delay is wisdom or avoidance.",
      vi: "Hy sinh vô ích, trì trệ kéo dài hoặc chống cự việc buông bỏ. Hãy phân biệt giữa sự chờ đợi chín muồi và việc trốn tránh hành động."
    }
  },
  "14": { // Death
    summary: {
      en: "The archetype of profound transformation, natural endings making room for new growth, and shedding outlived identities.",
      vi: "Biểu tượng của sự chuyển hóa sâu sắc, kết thúc một chu kỳ để mở đường cho sự tái sinh và lột xác."
    },
    upright: {
      en: "Allow what has expired to fall away peacefully. True renewal begins only after you release the old forms and attachments.",
      vi: "Hãy để những điều đã hết vai trò ra đi thanh thản. Một chương mới chỉ có thể bắt đầu khi bạn can đảm khép lại trang cũ."
    },
    reversed: {
      en: "Clinging desperately to expired patterns, fear of grief, or resisting closure. Gently acknowledge that holding on causes more pain than letting go.",
      vi: "Cố chấp níu kéo điều đã qua, sợ hãi đổi thay hoặc né tránh sự mất mát. Giữ chặt những điều đã cũ chỉ làm bạn kiệt sức."
    }
  },
  "15": { // Temperance
    summary: {
      en: "The archetype of harmonious integration, emotional equilibrium, patience, and synthesizing opposites into a peaceful whole.",
      vi: "Biểu tượng của sự điều độ, dung hòa các mặt đối lập, tính kiên nhẫn và sự cân bằng nội tâm tĩnh tại."
    },
    upright: {
      en: "Seek the middle path. Blend different aspects of your life with patience, moderation, and calm emotional regulation.",
      vi: "Chọn con đường trung đạo. Hãy hòa phối các yếu tố trái ngược bằng sự kiên nhẫn, điềm tĩnh và chừng mực trong hành xử."
    },
    reversed: {
      en: "Extremes, impatience, emotional turbulence, or internal discord. Bring yourself back into alignment through rest and mindful pacing.",
      vi: "Sự thái quá, thiếu kiên nhẫn hoặc xáo trộn cảm xúc. Hãy điều hòa lại nhịp sống và tránh phản ứng nóng vội lúc này."
    }
  },
  "16": { // The Devil
    summary: {
      en: "The archetype of shadow projections, self-limiting attachments, unconscious compulsions, and illusion of helplessness.",
      vi: "Biểu tượng của bóng tối tâm lý (shadow), sự ràng buộc tự tạo, thói quen độc hại và ảo tưởng bị cầm tù."
    },
    upright: {
      en: "Examine unhealthy patterns or dependencies. The chains are often looser than you think—awareness is your gateway to liberation.",
      vi: "Nhìn thẳng vào những thói quen gây hại hoặc sự lệ thuộc vô thức. Nhận thức rõ ràng là chìa khóa đầu tiên để bạn tự giải thoát mình."
    },
    reversed: {
      en: "Breaking free from toxic patterns, waking up from illusions, and reclaiming personal sovereignty with courage.",
      vi: "Bước đầu thoát khỏi sự trói buộc, thức tỉnh trước ảo vọng và từng bước lấy lại quyền tự quyết cho cuộc sống của bạn."
    }
  },
  "17": { // The Tower
    summary: {
      en: "The archetype of sudden awakening, collapse of brittle illusions, and catalytic truth dismantling false security.",
      vi: "Biểu tượng của sự thức tỉnh đột ngột, sụp đổ các ảo tưởng sai lầm và sự giải phóng cần thiết để xây dựng lại chân thực hơn."
    },
    upright: {
      en: "A sudden realization shatters rigid assumptions. Though destabilizing, it clears away falsehood so you can build on authentic ground.",
      vi: "Một biến cố hoặc nhận thức bất ngờ đập tan những điều giả tạo. Dù bỡ ngỡ ban đầu, nền tảng mới sẽ chân thực và vững chắc hơn."
    },
    reversed: {
      en: "Averting total disaster, internal crisis of belief, or clinging to a collapsing structure out of terror. Accept reality to rebuild safely.",
      vi: "Cố gắng né tránh sự thật hiển nhiên, khủng hoảng niềm tin ngấm ngầm. Đừng cố vá víu những điều đã mục ruỗng."
    }
  },
  "18": { // The Star
    summary: {
      en: "The archetype of serene hope, spiritual renewal, renewed faith, and clarity following profound turbulence.",
      vi: "Biểu tượng của niềm hy vọng sáng trong, sự phục hồi tinh thần, niềm tin tái sinh và nguồn cảm hứng thanh khiết."
    },
    upright: {
      en: "Healing and renewal are flowing into your life. Have faith in your future and share your authentic light with genuine vulnerability.",
      vi: "Nguồn năng lượng chữa lành và hy vọng đang trở lại. Hãy nuôi dưỡng niềm tin và giữ tâm thế rộng mở đón nhận tương lai."
    },
    reversed: {
      en: "Discouragement, cynicism, or difficulty sensing hope amidst fatigue. Nurture small embers of trust without expecting instant perfection.",
      vi: "Cảm giác tuyệt vọng, mất niềm tin tạm thời hoặc kiệt sức. Hãy chăm chút từng niềm vui nhỏ bé để nhen nhóm lại ánh sáng."
    }
  },
  "19": { // The Moon
    summary: {
      en: "The archetype of the unconscious realm, ambiguous emotional depths, illusions, and navigating through foggy uncertainty.",
      vi: "Biểu tượng của tiềm thức sâu kín, những ảo ảnh mơ hồ, nỗi sợ vô hình và hành trình đi qua sương mù chưa rõ ràng."
    },
    upright: {
      en: "Things may not be as they seem on the surface. Don't rush major conclusions; pay attention to dreams and unspoken psychological undertones.",
      vi: "Mọi việc chưa hoàn toàn rõ ràng như vẻ ngoài. Đừng vội kết luận; hãy chú ý đến những cảm giác trực giác và nỗi sợ thầm kín."
    },
    reversed: {
      en: "Dispelling confusion, recognizing unfounded anxieties, or uncovering hidden truths that liberate your mind from paranoia.",
      vi: "Màn sương mù tan dần, nhận ra những âu lo là do tưởng tượng và tìm lại sự tỉnh táo, rành mạch."
    }
  },
  "20": { // The Sun
    summary: {
      en: "The archetype of radiant clarity, vital joy, warmth, conscious awareness, and celebrating wholesome vitality.",
      vi: "Biểu tượng của sự rõ ràng rực rỡ, niềm hân hoan thuần khiết, sức sống dồi dào và sự tự tin tỏa sáng."
    },
    upright: {
      en: "Clarity, enthusiasm, and vitality abound. Step into the light with joyful self-expression and gratitude for present blessings.",
      vi: "Mọi sự sáng tỏ, tràn ngập năng lượng tích cực và sự ấm áp. Hãy tự tin thể hiện chính mình với tinh thần lạc quan rộng mở."
    },
    reversed: {
      en: "Clouded optimism, struggling to access joy, or temporary burn-out. The warmth is still there—give yourself permission to rest and unburden.",
      vi: "Niềm vui bị che khuất tạm thời, mệt mỏi hoặc suy nghĩ bi quan. Mặt trời vẫn ở đó, hãy cho phép bản thân nghỉ ngơi để hồi phục."
    }
  },
  "21": { // Judgement
    summary: {
      en: "The archetype of self-reckoning, answering a higher calling, profound forgiveness, and awakening to your authentic life path.",
      vi: "Biểu tượng của sự phản tỉnh sâu sắc, tiếng gọi thức tỉnh, sự tha thứ và bước lên một tầng bậc nhận thức mới."
    },
    upright: {
      en: "Time to evaluate your journey with compassionate clarity. Release past regrets, heed your inner calling, and step forward unburdened.",
      vi: "Thời khắc nhìn nhận lại hành trình với sự bao dung. Hãy tha thứ cho quá khứ, lắng nghe tiếng gọi nội tâm và bước tiếp nhẹ nhõm."
    },
    reversed: {
      en: "Harsh self-condemnation, ignoring persistent wake-up calls, or paralysis by past mistakes. Practice self-mercy and decide to begin anew.",
      vi: "Tự phán xét cay nghiệt, phớt lờ bài học cuộc sống hoặc sợ hãi thay đổi. Hãy bao dung với chính mình và can đảm làm lại."
    }
  },
  "22": { // The World
    summary: {
      en: "The archetype of holistic completion, integration of lessons, cosmic wholeness, and triumphant transition into a new cycle.",
      vi: "Biểu tượng của sự viên mãn trọn vẹn, tích hợp mọi bài học, cảm giác đủ đầy và hoàn tất một chu kỳ lớn để chuẩn bị bước sang trang mới."
    },
    upright: {
      en: "Celebrate accomplishment and completion. You have integrated valuable life lessons; honor how far you have grown and embrace wholeness.",
      vi: "Chúc mừng sự hoàn tất và thành tựu đã đạt được. Bạn đã tích lũy đủ bài học giá trị; hãy tự hào về hành trình trưởng thành của mình."
    },
    reversed: {
      en: "Lingering loose ends, seeking external validation for closure, or hesitation at the threshold of the next chapter. Tie up the final details.",
      vi: "Còn chút vướng mắc chưa dứt, thiếu cảm giác trọn vẹn hoặc ngần ngại trước ngưỡng cửa mới. Hãy hoàn thành nốt những điều còn dang dở."
    }
  }
};

// Procedural generator for Minor Arcana based on suit and rank archetypes
const SUIT_THEMES = {
  wands: {
    enName: "Wands",
    viName: "Gậy",
    elementEn: "Fire (Creativity, passion, vitality, ambition, and will)",
    elementVi: "Lửa (Sáng tạo, đam mê, sinh lực, khát vọng và ý chí)",
  },
  cups: {
    enName: "Cups",
    viName: "Ly",
    elementEn: "Water (Emotions, relationships, intuition, empathy, and love)",
    elementVi: "Nước (Cảm xúc, mối quan hệ, trực giác, thấu cảm và tình yêu)",
  },
  swords: {
    enName: "Swords",
    viName: "Kiếm",
    elementEn: "Air (Intellect, discernment, communication, truth, and mental conflict)",
    elementVi: "Khí (Trí tuệ, phân tích, giao tiếp, sự thật và xung đột tinh thần)",
  },
  pentacles: {
    enName: "Pentacles",
    viName: "Xu",
    elementEn: "Earth (Material reality, resources, bodily health, craft, and grounded progress)",
    elementVi: "Đất (Hiện thực vật chất, tài chính, sức khỏe cơ thể, kỹ năng và nền tảng bền vững)",
  }
};

const RANK_ARCHETYPES = [
  {
    rank: "Ace",
    nameVi: "Át",
    summaryEn: "The raw seed of new potential, initial inspiration, and pure elemental breakthrough.",
    summaryVi: "Hạt mầm sơ khởi của tiềm năng mới, nguồn cảm hứng ban đầu và sự khởi phát thuần khiết.",
    uprightEn: "A pristine opportunity presents itself. Grasp this seed of potential and begin channelizing it into constructive reality.",
    uprightVi: "Một cơ hội tinh khôi xuất hiện. Hãy nắm lấy hạt mầm tiềm năng này và nuôi dưỡng nó thành hiện thực.",
    reversedEn: "Hesitation, ungrounded ideas, or missed beginnings. Ground your vision before momentum dissipates.",
    reversedVi: "Do dự, ý tưởng chưa có nền tảng hoặc lỡ nhịp khởi đầu. Hãy định hình lại mục tiêu trước khi nhiệt huyết phai nhạt."
  },
  {
    rank: "Two",
    nameVi: "Hai",
    summaryEn: "Duality, early balance, decision-making, and evaluating options.",
    summaryVi: "Sự phân vân, cân nhắc lựa chọn, thiết lập thế cân bằng ban đầu.",
    uprightEn: "Weigh your choices with mindfulness. Find equilibrium between two forces and plan your next steps deliberately.",
    uprightVi: "Cân nhắc kỹ lưỡng các phương án. Tìm thế cân bằng và lên kế hoạch cho bước đi tiếp theo một cách điềm tĩnh.",
    reversedEn: "Imbalance, indecision, or inner tension between competing demands. Make a clear choice to move forward.",
    reversedVi: "Mất cân bằng, do dự không dứt hoặc giằng xé giữa hai ngả đường. Cần dứt khoát đưa ra quyết định."
  },
  {
    rank: "Three",
    nameVi: "Ba",
    summaryEn: "Initial fruit, collaboration, expansion, and visible early progress.",
    summaryVi: "Thành quả đầu tiên, sự mở rộng, kết nối hợp tác và tiến triển cụ thể.",
    uprightEn: "Your initial efforts are bearing fruit. Look outward, collaborate, and expand your horizons with confidence.",
    uprightVi: "Những nỗ lực ban đầu đã đơm hoa kết trái. Hãy mở rộng tầm nhìn, kết nối hợp tác và tự tin tiến xa hơn.",
    reversedEn: "Delays, creative friction, or dashed expectations. Regroup, refine your methods, and communicate clearly.",
    reversedVi: "Chậm tiến độ, bất đồng trong hợp tác hoặc kỳ vọng chưa đạt. Hãy điều chỉnh phương pháp và trao đổi cởi mở hơn."
  },
  {
    rank: "Four",
    nameVi: "Bốn",
    summaryEn: "Stability, structure, consolidation, and protecting established foundations.",
    summaryVi: "Sự ổn định, củng cố nền tảng, thiết lập trật tự và bảo vệ thành quả.",
    uprightEn: "Consolidate your position. Appreciate current stability and build secure structures that provide emotional or material grounding.",
    uprightVi: "Củng cố vị thế hiện tại. Trân trọng sự bình ổn và xây dựng nền tảng an toàn cho chặng đường dài.",
    reversedEn: "Stagnation, rigidity, or fear of stepping beyond comfort zones. Open up to necessary healthy change.",
    reversedVi: "Trì trệ, bám víu vùng an toàn hoặc sự cứng nhắc quá mức. Hãy sẵn sàng đón nhận những luồng gió mới."
  },
  {
    rank: "Five",
    nameVi: "Năm",
    summaryEn: "Challenge, tension, conflict, testing of limits, and constructive growth through friction.",
    summaryVi: "Thử thách, xung đột, sự xáo trộn thử thách bản lĩnh để trưởng thành.",
    uprightEn: "Friction reveals where adjustments are needed. Treat conflict as feedback rather than defeat, and seek constructive resolution.",
    uprightVi: "Va chạm giúp nhận ra điều cần chỉnh sửa. Hãy xem mâu thuẫn như phản hồi để hoàn thiện hơn, thay vì buông xuôi.",
    reversedEn: "Easing of tensions, recovery from setback, or exhausting inner turmoil. Choose peace over stubborn battles.",
    reversedVi: "Căng thẳng dần lắng xuống, phục hồi sau va vấp. Hãy buông bỏ những tranh cãi vô bổ để lấy lại bình yên."
  },
  {
    rank: "Six",
    nameVi: "Sáu",
    summaryEn: "Harmony regained, reciprocity, transit to calmer waters, and mutual support.",
    summaryVi: "Lấy lại cân bằng, sự chia sẻ tương hỗ, chuyển tiếp sang vùng nước êm đềm.",
    uprightEn: "Balance and grace return. Enjoy mutual cooperation, sharing of resources, and gentle forward movement.",
    uprightVi: "Sự thanh thản và hòa hợp trở lại. Hãy đón nhận sự hỗ trợ lẫn nhau và tiếp tục tiến bước trong bình an.",
    reversedEn: "Reluctance to move on, unresolved past attachments, or one-sided dynamics. Focus on forward healing.",
    reversedVi: "Khó khăn trong việc buông bỏ quá khứ, tương tác một chiều. Hãy hướng về phía trước để chữa lành triệt để."
  },
  {
    rank: "Seven",
    nameVi: "Bảy",
    summaryEn: "Assessment, perseverance, strategic reflection, and facing inner dilemmas.",
    summaryVi: "Đánh giá lại quá trình, sự kiên trì, suy ngẫm chiến lược và đối diện băn khoăn nội tâm.",
    uprightEn: "Stand firm in your convictions while assessing long-term value. Patience and strategic honesty serve you best.",
    uprightVi: "Giữ vững lập trường và đánh giá lại giá trị lâu dài. Sự kiên nhẫn và tính toán tỉnh táo là điều bạn cần lúc này.",
    reversedEn: "Impatient rushing, exhaustion, or second-guessing choices. Take a breath and realign with genuine priorities.",
    reversedVi: "Hấp tấp sốt ruột, kiệt sức hoặc hoài nghi bản thân. Hãy hít thở sâu và xác định lại điều gì thực sự cốt lõi."
  },
  {
    rank: "Eight",
    nameVi: "Tám",
    summaryEn: "Mastery, dedication, accelerated movement, or deliberate transition.",
    summaryVi: "Sự tập trung rèn luyện, nhịp độ dồn dập hoặc chuyển bước dứt khoát.",
    uprightEn: "Channel focus into your craft or path. Dedicated practice and decisive momentum bring notable breakthroughs.",
    uprightVi: "Dồn hết tâm trí vào công việc hoặc hành trình. Sự rèn luyện tận tâm và nhịp bước dứt khoát sẽ tạo bước đột phá.",
    reversedEn: "Burnout, scattered speed without purpose, or resisting necessary departure. Slow down to restore intentionality.",
    reversedVi: "Kiệt sức, hành động vội vã mất phương hướng hoặc chần chừ rời bỏ điều không còn phù hợp. Cần chậm lại."
  },
  {
    rank: "Nine",
    nameVi: "Chín",
    summaryEn: "Culmination, self-reliance, resilience, and approaching completion.",
    summaryVi: "Đỉnh cao tích lũy, sự tự chủ kiên cường, cận kề đích đến.",
    uprightEn: "Draw upon your proven resilience and inner strength. You are nearly at your goal; guard your peace and stand tall.",
    uprightVi: "Phát huy sức mạnh nội tại và sự kiên cường đã được trui rèn. Đích đến đã rất gần; hãy giữ vững niềm tin.",
    reversedEn: "Defensiveness, paranoia, or fatigue near the finish line. Allow yourself to rest without giving up your gains.",
    reversedVi: "Phòng thủ thái quá, kiệt sức ngay trước vạch đích. Cho phép mình nghỉ ngơi mà không làm mất đi thành quả."
  },
  {
    rank: "Ten",
    nameVi: "Mười",
    summaryEn: "Full cycle completion, culmination of consequences, and transitioning to a fresh era.",
    summaryVi: "Hoàn tất chu kỳ, kết quả trọn vẹn của cả một hành trình và chuẩn bị bước sang trang mới.",
    uprightEn: "A cycle reaches its fullness. Honor the complete outcome—whether a bountiful fulfillment or the release of a heavy load.",
    uprightVi: "Chu kỳ đã chạm tới đỉnh điểm trọn vẹn. Hãy ghi nhận kết quả và sẵn sàng đón nhận chu kỳ tiếp theo.",
    reversedEn: "Overburdened exhaustion, denying closure, or dragging past baggage. Put down the burden and allow the end to be the end.",
    reversedVi: "Quá tải gánh nặng, trốn tránh kết thúc hoặc ôm đồm quá mức. Hãy đặt gánh nặng xuống để giải phóng chính mình."
  },
  {
    rank: "Page",
    nameVi: "Tiểu Đồng",
    summaryEn: "Curious exploration, student archetype, youthful enthusiasm, and fresh messages.",
    summaryVi: "Tính tò mò khám phá, tâm thế người học hỏi, nhiệt huyết trẻ trung và tin tức mới mẻ.",
    uprightEn: "Approach your path with open curiosity and eagerness to learn. Welcome new inspirations with a beginner's enthusiasm.",
    uprightVi: "Hãy tiếp cận mọi việc bằng sự tò mò trong sáng và tinh thần cầu thị. Đón nhận cảm hứng mới với lòng nhiệt thành.",
    reversedEn: "Petty drama, lack of follow-through, or immature distraction. Focus your curiosity into disciplined learning.",
    reversedVi: "Nông nổi, thiếu kiên định hoặc bị xao nhãng bởi những chuyện vụn vặt. Hãy biến tò mò thành kỷ luật học tập."
  },
  {
    rank: "Knight",
    nameVi: "Hiệp Sĩ",
    summaryEn: "Dynamic pursuit, questing energy, passionate momentum, and active dedication.",
    summaryVi: "Hành động quyết liệt, năng lượng xông xáo, dấn thân vì mục tiêu.",
    uprightEn: "Pursue your quest with courage, vigor, and dedicated drive. Channel passionate energy into purposeful action.",
    uprightVi: "Tiến lên với lòng dũng cảm, tinh thần quyết đoán và năng lượng dồi dào. Biến nhiệt huyết thành hành động thiết thực.",
    reversedEn: "Recklessness, erratic impulsiveness, or running hot and cold. Ground your fiery drive with strategic patience.",
    reversedVi: "Hấp tấp nóng vội, bốc đồng mất kiểm soát hoặc dễ nản chí. Cần ghìm cương cảm xúc bằng sự kiên nhẫn."
  },
  {
    rank: "Queen",
    nameVi: "Hoàng Hậu",
    summaryEn: "Mature emotional wisdom, self-possession, nurturing mastery, and inward authority.",
    summaryVi: "Sự thấu suốt chín chắn, tự tin làm chủ cảm xúc, nuôi dưỡng bằng sự tinh tế và ấm áp.",
    uprightEn: "Embody grounded grace, self-confidence, and intuitive stewardship. Lead from a center of quiet wisdom and emotional poise.",
    uprightVi: "Tỏa ra phong thái tự tin, điềm đạm và thấu cảm. Dẫn dắt mọi việc bằng sự ấm áp và chiều sâu nội tâm.",
    reversedEn: "Emotional withdrawal, insecurity, or martyrdom. Reconnect with self-love and establish clear internal sovereignty.",
    reversedVi: "Khép kín cảm xúc, bất an thiếu tự tin hoặc cảm giác hy sinh vô ích. Hãy trở về chăm sóc lòng tự trắc ẩn."
  },
  {
    rank: "King",
    nameVi: "Vua",
    summaryEn: "External mastery, mature leadership, ethical oversight, and commanding expertise.",
    summaryVi: "Bản lĩnh làm chủ, tầm nhìn lãnh đạo trưởng thành, sự thông thái và trách nhiệm vững vàng.",
    uprightEn: "Exercise calm command and mature stewardship. Guide your situation with fairness, experience, and grounded vision.",
    uprightVi: "Thể hiện bản lĩnh làm chủ và sự từng trải. Dẫn dắt tình huống bằng sự công tâm, tỉnh táo và tầm nhìn xa.",
    reversedEn: "Autocratic rigidity, aloof detachment, or misuse of authority. Soften your approach with empathy and humility.",
    reversedVi: "Độc đoán cứng nhắc, xa cách lạnh lùng hoặc lạm quyền. Hãy lắng nghe nhiều hơn với sự khiêm tốn và thấu cảm."
  }
];

// Build mapping for all 78 cards
const allCardMeanings = {};

cards.forEach((card) => {
  const idStr = String(card.id);
  const idNum = Number(card.id);

  if (idNum >= 1 && idNum <= 22) {
    allCardMeanings[idStr] = MAJOR_MEANINGS[idStr];
  } else {
    // Minor Arcana
    let suitKey = 'wands';
    let offset = 23;
    if (idNum >= 23 && idNum <= 36) { suitKey = 'wands'; offset = 23; }
    else if (idNum >= 37 && idNum <= 50) { suitKey = 'cups'; offset = 37; }
    else if (idNum >= 51 && idNum <= 64) { suitKey = 'swords'; offset = 51; }
    else if (idNum >= 65 && idNum <= 78) { suitKey = 'pentacles'; offset = 65; }

    const rankIdx = idNum - offset;
    const rankInfo = RANK_ARCHETYPES[rankIdx] || RANK_ARCHETYPES[0];
    const suitInfo = SUIT_THEMES[suitKey];

    const suitSpecificUprightEn = `${rankInfo.uprightEn} Focus this energy into ${suitInfo.elementEn.toLowerCase()}.`;
    const suitSpecificUprightVi = `${rankInfo.uprightVi} Hướng năng lượng này vào các khía cạnh thuộc nguyên tố ${suitInfo.elementVi}.`;
    const suitSpecificReversedEn = `${rankInfo.reversedEn} Watch for blocked or excessive expression in matters of ${suitInfo.elementEn.toLowerCase()}.`;
    const suitSpecificReversedVi = `${rankInfo.reversedVi} Chú ý sự tắc nghẽn hoặc biểu hiện quá đà liên quan đến ${suitInfo.elementVi}.`;

    allCardMeanings[idStr] = {
      summary: {
        en: `${card.name.en}: ${rankInfo.summaryEn} Governed by ${suitInfo.elementEn}.`,
        vi: `${card.name.vi}: ${rankInfo.summaryVi} Thuộc nguyên tố ${suitInfo.elementVi}.`
      },
      upright: {
        en: suitSpecificUprightEn,
        vi: suitSpecificUprightVi
      },
      reversed: {
        en: suitSpecificReversedEn,
        vi: suitSpecificReversedVi
      }
    };
  }
});

const fileContent = `/**
 * Curated Tarot Card Psychological Descriptions & General Meanings
 * Aligned with Tarot as a psychological mirror for self-reflection & decision support.
 */

export interface CardMeaningDetail {
  summary: {
    en: string;
    vi: string;
  };
  upright: {
    en: string;
    vi: string;
  };
  reversed: {
    en: string;
    vi: string;
  };
}

export const CARD_MEANINGS: Record<string, CardMeaningDetail> = ${JSON.stringify(allCardMeanings, null, 2)};

export function getCardMeaning(cardId: string): CardMeaningDetail | undefined {
  return CARD_MEANINGS[cardId];
}
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Generated card meanings for ${Object.keys(allCardMeanings).length} cards at ${outputPath}`);
