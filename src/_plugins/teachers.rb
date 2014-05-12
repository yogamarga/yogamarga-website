
module Jekyll

    class AllTeachersIndex < Page

        def initialize(site, base, dir)
            @site = site
            @base = base
            @dir  = dir
            @name = "index.html"

            self.read_yaml(File.join(base, '_layouts'), 'teachers.html')
            self.data['teachers'] = self.get_all_teachers(site)
            self.process(@name)
        end

        def get_all_teachers(site)
            puts "1 - AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
            {}.tap do |teachers|
                puts "2 - " + Dir.pwd
                Dir['_teachers/*.yml'].each do |path|
                    puts "3 - AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                    name   = File.basename(path, '.yml')
                    config = YAML.load(File.read(File.join(@base, path)))
                    type   = config['type']
                    category = config['category']

                    puts "type " + type
                    puts "name " + name
                    puts "category " + category

                    if config['active']
                        teachers[type] = {} if teachers[type].nil?
                        teachers[type][name] = config
                    end
                end
            end # tap
        end #get_all_teachers

    end # AllTeachersIndex

    # Generates a page for the specified teacher
    class TeacherIndex < Page
        def initialize(site, base, dir, path)
            @site = site
            @base = base
            @dir  = dir
            @name = "index.html"

            self.read_yaml(File.join(base, '_layouts'), 'teacher.html')
            self.data = YAML.load(File.read(File.join(@base + "/_teachers", path + ".yml")))
            self.process(@name)
        end
    end



    # GENERATORS
    module Generators
        class GenerateAllTeachers < Generator
            safe true
            priority :normal

            def generate(site)
                puts "11111111111111111111111111111111111111111111111111111111111111111111111111111111"
                generate_all_teachers(site)
            end

            # Loops through the list of teachers and processes each one of them.
            def generate_all_teachers(site)
                puts "222222222222222222222222222222222222222222222222222222222222 " + Dir.pwd
                if Dir.exists?('_teachers')
                    puts "3333333333"
                    Dir.chdir('_teachers')

                    Dir["*.yml"].each do |path|
                        puts "444444444 " + path
                        name = File.basename(path, '.yml')
                        self.generate_teacher_index(site, site.source, "/pages/teachers/" + name, name)
                    end

                    Dir.chdir(site.source)
                    self.generate_all_teachers_index(site)
                end
            end

            # Generates the index page for all of the teachers
            def generate_all_teachers_index(site)
                puts "55555555555555555555555555555555555555555555555555555555"
                allTeachers = AllTeachersIndex.new(site, site.source, "/pages/teachers")
                allTeachers.render(site.layouts, site.site_payload)
                allTeachers.write(site.dest)

                site.pages << allTeachers
                site.static_files << allTeachers
            end


            # Generates the page for a specific teacher
            def generate_teacher_index(site, base, dir, path)
                puts "666666666666666666666666666666666666666666666666 base " + base
                puts "666666666666666666666666666666666666666666666666 dir " + dir
                puts "666666666666666666666666666666666666666666666666 path " + path
                teacher = TeacherIndex.new(site, base, dir, path)
                if teacher.data['active']
                    puts "77777777777777777777777777777777777777777777777777777777"
                    teacher.render(site.layouts, site.site_payload)
                    teacher.write(site.dest)

                    site.pages << teacher
                    site.static_files << teacher
                end

            end

        end # class GenerateAllTeachers < Generator
    end # module Generators

end










